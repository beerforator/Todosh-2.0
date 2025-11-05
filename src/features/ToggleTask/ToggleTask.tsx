import { Task } from '@/shared/types/entities';
import { Checkbox, CircularProgress } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface ToggleTaskProps {
    task: Task,
    size?: 'small' | 'medium'
}

export const ToggleTask = ({ task, size = 'medium' }: ToggleTaskProps) => {
    const [letToggle, isLettingToggle] = useApiRequest(updateTaskApi, {})

    const handleToggle = (e: React.ChangeEvent) => {
        e.stopPropagation()

        let payload = {
            taskId: task.id,
            changes: { isCompleted: !task.isCompleted }
        }

        letToggle(payload)
    }

    if (isLettingToggle) {
        const spinnerSize = size === 'small' ? 8 : 24
        return <CircularProgress size={spinnerSize} style={{ margin: '12px' }} />
    }

    return (
        <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            checked={task.isCompleted}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isLettingToggle}

            sx={{ p: size === 'small' ? '4px' : '12px' }}
        />
    );
};