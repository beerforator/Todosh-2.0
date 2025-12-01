import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { TaskDetailsPane } from './TaskDetailsPane';

import styleP from '@/app/styles/TaskDetailsPane.module.scss'

export const TaskDetailsPaneContainer = () => {
    console.log('Перенести сетевые запросы и функции СЮДА из ребенка')
    console.log('Панель деталей пока не трогал см коммент')

    /* ПРАВКИ
    
    1. Нужно добавить выбор листа
    2. Дизейблить кнопки дат
    3. Перенести логику в контейнер
    4. Классы стилей - проверить названия
    5. Закрывать панель при переходе на страницу (можно удалить стейт изменения задачи)
    6. САМОЕ ГЛАВНОЕ - убрать кнопку и посылать запросы на сервак в фоне или при потере фокуса

    */

    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);



    if (!editingTaskId) {
        return null;
    }

    return (
        <div className={(!!editingTaskId && detailsPaneMode === 'persistent')
            ? (styleP.drawerContainer)
            : (styleP.drawerContainerr + ' ' + styleP.drawerContainer_closed)}
        >
            <TaskDetailsPane
                taskId={editingTaskId}
                variant={detailsPaneMode}
            />
        </div>
    );
};