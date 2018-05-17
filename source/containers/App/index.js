// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//Components
import { Provider } from '../../components/HOC/withProfile';
import Scheduler from '../../components/Scheduler';

const config = {
    applicationTitle:     'Планировщик задач',
    currentUserFirstName: 'Павел',
    currentUserLastName:  'Малаховский',
};

@hot(module)
export default class App extends Component {
    render () {
        const localStoreTasks = JSON.parse(localStorage.getItem('tasksSchedulerDefaultValue'));

        return (
            <Provider value = { config }>
                <Scheduler
                    { ...config }
                    localStoreTasks = { localStoreTasks ? localStoreTasks : null }
                />
            </Provider>
        );
    }
}
