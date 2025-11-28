import { useCallback, useState } from "react";
import { Box, Button, CircularProgress, ListItemIcon, TextField } from "@mui/material";
import { createTaskApi } from "@/app/services/taskServices/createTaskApi";
import { useApiRequest } from "@/shared/hooks/useApiRequest";

import style from '@/app/styles/IconStyles.module.scss'
import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'
import { AddPlusIcon } from "@/shared/ui/Icons/SidebarIcons";
import { TaskText } from "@/entities/Task/ui/TaskCard";

interface InlineCreateTaskProps {
    listId: string | null;
    onClose: () => void;
    onClick: () => void;
    isFormVisible: boolean;
}

export const InlineCreateTask = ({ listId, onClose, onClick, isFormVisible }: InlineCreateTaskProps) => {
    const [title, setTitle] = useState('');

    const [letSubmit, isLettingSubmit] = useApiRequest(createTaskApi, {
        onFinally: () => {
            setTitle('');
            onClose()
        }
    })

    const handleSubmit = () => {
        if (!title.trim() || !listId) return;

        let listOwnerId

        if (listId === 'all' || listId === 'today')
            listOwnerId = ''
        else
            listOwnerId = listId

        let startDate = undefined
        let endDate = undefined

        if (listId === 'today') {
            const today = new Date();
            endDate = new Date(today);
            startDate = today
        }

        let payload = {
            title: title,
            listOwnerId: listOwnerId,
            startDate: startDate,
            endDate: endDate
        }

        letSubmit(payload)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
        if (event.key === 'Escape') {
            onOut();
        }
    };

    const onOut = useCallback(() => {
        setTitle('')
        onClose()
    }, [])

    return (
        <Button
            className={'paperBlock ' + styleT.taskCard_container + ' ' + styleT.cardButton}
            onClick={onClick}
            disabled={!listId}
        >
            <div className={styleT.taskCard_stuff} >

                <ListItemIcon>
                    <AddPlusIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>

                <div className={styleT.taskCard_textContent}>
                    {!isFormVisible && (
                        <TaskText
                            text='Add task'
                            isCompleted={false}
                            type='title'
                        />
                    )}

                    {isFormVisible && (
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="Task title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            disabled={isLettingSubmit}
                            onBlur={onOut}

                            className={styleT.createInput}
                        />
                    )}

                </div>
            </div>
        </Button>
    );
};
