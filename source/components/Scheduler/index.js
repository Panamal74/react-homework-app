// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Transition, TransitionGroup } from 'react-transition-group';

// Instruments
import { withApi } from "../../components/HOC/withApi";
import Animation from './animation';

// Style
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../../components/Task';
import Spinner from '../../components/Spinner';

class Scheduler extends Component {
    static propTypes = {
        applicationTitle:          PropTypes.string.isRequired,
        checkFieldLength:          PropTypes.func.isRequired,
        currentUserFirstName:      PropTypes.string.isRequired,
        currentUserLastName:       PropTypes.string.isRequired,
        doChangeTask:              PropTypes.func.isRequired,
        doCompleteAll:             PropTypes.func.isRequired,
        doCreateTask:              PropTypes.func.isRequired,
        doRemoveTask:              PropTypes.func.isRequired,
        getCompletedFavoriteTasks: PropTypes.func.isRequired,
        getCompletedOtherTasks:    PropTypes.func.isRequired,
        getFavoriteTasks:          PropTypes.func.isRequired,
        getFilterTasks:            PropTypes.func.isRequired,
        getOtherTasks:             PropTypes.func.isRequired,

    };
    constructor () {
        super();
        this.handleChangeInputValue = this._handleChangeInputValue.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.handleInputKeyDown = this._handleInputKeyDown.bind(this);
        this.getRenderTasks = this._getRenderTasks.bind(this);
    }
    state = {
        inputValue:  '',
        searchValue: '',
        duration:    0.3,
    };

    _handleChangeInputValue (event) {
        const { checkFieldLength } = this.props;

        this.setState({
            [event.target.name]: checkFieldLength(event.target.value),
        });
    }

    _handleInputKeyDown (event) {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    _handleSubmit (event) {
        const { doCreateTask } = this.props;
        const { inputValue } = this.state;

        event.preventDefault();

        if (inputValue.trim()) {
            doCreateTask(inputValue);
        }
        this.setState({ inputValue: '' });
    }

    _handleTaskOpen = (task) => {
        const { duration } = this.state;

        Animation.open(task, duration);
    };

    _handleTaskClose = (task) => {
        const { duration } = this.state;

        Animation.close(task, duration);
    };

    _getRenderTasks (showTasks) {
        const { doChangeTask, doRemoveTask, checkFieldLength } = this.props;
        const { duration } = this.state;

        return showTasks.map((value) => {
            return (
                <Transition
                    appear
                    key = { value.id }
                    timeout = { {
                        enter: duration * 1000,
                        exit:  duration * 1000,
                    } }
                    onEnter = { this._handleTaskOpen }
                    onExit = { this._handleTaskClose }>
                    <Task
                        { ...value }
                        checkFieldLength = { checkFieldLength }
                        doChangeTask = { doChangeTask }
                        doRemoveTask = { doRemoveTask }
                    />
                </Transition>
            );
        });
    }

    render () {
        const {
            applicationTitle,
            currentUserFirstName,
            currentUserLastName,
            tasks,
            isTasksFetching,
            doCompleteAll,
            getFilterTasks,
            getFavoriteTasks,
            getCompletedFavoriteTasks,
            getCompletedOtherTasks,
            getOtherTasks,
        } = this.props;
        const {
            inputValue,
            searchValue,
        } = this.state;

        const completeAll = tasks.every((value) => {
            return value.completed === true;
        });

        const showTasks = getFilterTasks(searchValue, tasks);
        const renderFavoriteTasks = this.getRenderTasks(getFavoriteTasks(showTasks));
        const renderOtherTasks = this.getRenderTasks(getOtherTasks(showTasks));
        const renderCompletedFavoriteTasks = this.getRenderTasks(getCompletedFavoriteTasks(showTasks));
        const renderCompletedOtherTasks = this.getRenderTasks(getCompletedOtherTasks(showTasks));

        return (
            <div>
                <Spinner isSpinning = { isTasksFetching } />
                <section className = { Styles.scheduler }>
                    <main>
                        <header>
                            <h1>{ applicationTitle }</h1>
                            <input
                                name = 'searchValue'
                                placeholder = 'Поиск'
                                type = 'text'
                                value = { searchValue }
                                onChange = { this.handleChangeInputValue }
                            />
                        </header>
                        <section>
                            <form>
                                <input
                                    name = 'inputValue'
                                    placeholder = 'Описание моей новой задачи'
                                    type = 'text'
                                    value = { inputValue }
                                    onChange = { this.handleChangeInputValue }
                                    onKeyDown = { this.handleInputKeyDown }
                                />
                                <button onClick = { this.handleSubmit }>
                                    Добавить задачу
                                </button>
                            </form>
                            <div className = { Styles.overlay }>
                                <ul>
                                    <TransitionGroup>
                                        { renderFavoriteTasks }
                                        { renderOtherTasks }
                                        { renderCompletedFavoriteTasks }
                                        { renderCompletedOtherTasks }
                                    </TransitionGroup>
                                </ul>
                            </div>
                        </section>
                        <footer>
                            <Checkbox
                                inlineBlock
                                checked = { completeAll }
                                color1 = '#000'
                                color2 = '#FFF'
                                onClick = {
                                    !completeAll
                                        ? doCompleteAll
                                        : null
                                }
                            />
                            <span className = { Styles.completeAllTasks }>
                                { completeAll
                                    ? `${currentUserFirstName} ${currentUserLastName}, все Ваши задачи выполнены!!!`
                                    : `Выполнить все задачи`
                                }
                            </span>
                        </footer>
                    </main>
                </section>
            </div>

        );
    }
}

export default withApi(Scheduler);
