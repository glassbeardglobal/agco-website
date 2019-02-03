// @flow
import React, { Component } from 'react';
import anime from 'animejs';

const ANIMATION_DURATION = 150;

class PaneTransition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: !props.visible,
    };
  }

  componentDidMount() {
    const { uid, visible } = this.props;
    if (visible) {
      anime({
        targets: `#${uid}`,
        opacity: [0, 1],
        left: [-30, 0],
        delay: 200,
        duration: ANIMATION_DURATION,
        easing: 'linear',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, uid } = this.props;
    const { innerWidth } = window;
    if (!visible && prevProps.visible) {
      // Transition out
      anime({
        targets: `#${uid}`,
        opacity: [1, 0],
        left: innerWidth < 830 ? null : [0, 30],
        duration: ANIMATION_DURATION,
        easing: 'linear',
        complete: () => {
          this.setState({ hidden: true });
        },
      });
    } else if (visible && !prevProps.visible) {
      // Transition in
      setTimeout(() => {
        this.setState({ hidden: false });
      }, ANIMATION_DURATION);
      setTimeout(() => {
        anime({
          targets: `#${uid}`,
          opacity: [0, 1],
          left: innerWidth < 830 ? null : [-30, 0],
          duration: ANIMATION_DURATION,
          easing: 'linear',
        });
      }, ANIMATION_DURATION + 200);
    }
  }

  render() {
    const { uid, children } = this.props;
    const { hidden } = this.state;

    const style = {
      display: hidden ? 'none' : 'block',
      position: 'relative',
      opacity: 0,
    };

    return (
      <div className="form-transition" style={style} id={uid}>
        {children}
      </div>
    );
  }
}

export default PaneTransition;