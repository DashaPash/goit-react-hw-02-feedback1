import React, { Component } from 'react';
import FeedbackOptions from './Components/FeedbackOptions';
import Statistics from './Components/Statistics';
import Section from './Components/Section';
import Notification from './Components/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    const stateVal = Object.values(this.state);
    return stateVal.reduce((acc, value) => acc + value, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const goodFeedbacks = this.state.good;
    const totalFeedbacks = this.countTotalFeedback();
    return Math.round((goodFeedbacks * 100) / totalFeedbacks);
  };

  onClickButton = indx => {
    this.setState(prevState => ({
      [indx]: prevState[indx] + 1,
    }));
  };

  render() {
    const totalFeedbacks = this.countTotalFeedback();
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onClickButton}
          />
        </Section>

        <Section title="Statistisc">
          {totalFeedbacks ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positiveFeedback={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}

export default App;
