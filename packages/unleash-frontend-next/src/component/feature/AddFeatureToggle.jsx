import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createFeatureToggles } from '../../store/feature-actions';
import AddFeatureToggleUI from './AddFeatureToggleUI';

const mapStateToProps = (state) => ({
    strategies: state.strategies.toJS(),
});

class AddFeatureToggle extends React.Component {
    constructor () {
        super();
        this.state = {
            name: '',
            description: '',
            enabled: false,
            strategies: [],
        };
    }

    static propTypes () {
        return {
            dispatch: PropTypes.func.isRequired,
            strategies: PropTypes.array,
        };
    }

    static contextTypes = {
        router: React.PropTypes.object,
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.dispatch(createFeatureToggles(this.state));
        this.context.router.push('/features');
    };

    onCancel = (evt) => {
        evt.preventDefault();
        this.context.router.push('/features');
    };

    updateField = (key, value) => {
        const change = {};
        change[key] = value;
        this.setState(change);
    };

    addStrategy = (strategy) => {
        const strategies = this.state.strategies;
        strategies.push(strategy);
        this.setState({ strategies });
    }

    removeStrategy = (strategy) => {
        const strategies = this.state.strategies.filter(s => s !== strategy);
        this.setState({ strategies });
    }

    render () {
        return (
            <div>
                <AddFeatureToggleUI
                    strategies={this.props.strategies}
                    featureToggle={this.state}
                    updateField={this.updateField}
                    addStrategy={this.addStrategy}
                    removeStrategy={this.removeStrategy}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddFeatureToggle);