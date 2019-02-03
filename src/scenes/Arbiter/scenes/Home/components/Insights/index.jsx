import React, { Component } from 'react';
import { Pie, HorizontalBar, defaults } from 'react-chartjs-2';
import { Spring, animated, config } from 'react-spring';
import * as data from './chart/data';
import * as options from './chart/options';

import './styles.scss';

defaults.global.animation.easing = 'easeOutBack';

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      visible: false,
      timer: false,
      chartHeight: '300px',
    };

    this.AnimatedGraph = this.AnimatedGraph.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible && !state.visible) {
      return { visible: true, display: false, timer: true };
    }
    if (!props.visible && state.visible) {
      return { visible: false, display: false, timer: false };
    }
    return state;
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer) {
      setTimeout(() => this.setState({ display: true }), 600);
      this.setState({ timer: false });
    }
  }

  AnimatedGraph({ children }) {
    return (
      <Spring
        config={config.slow}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
      >
        { style =>
            <animated.div style={style} className="graph-cont">
              {children}
            </animated.div>
        }
      </Spring>
    );
  }

  // addData() {
  //   const chart = this.refs.chart.chartInstance;
  //   console.log(this.refs);
  //   chart.data.labels.push('Shovels');
  //   chart.data.datasets.forEach((dataset) => {
  //       dataset.data.push(25);
  //   });
  //   this.setState({ chartHeight: '400px' });
  //   chart.update();
  // }

  render() {
    const { display } = this.state;

    return (
      <div className="pane insights">
        <div className="buyer">
          <h3>Buyer Insights</h3>
          { display && 
            <div style={{ width: '100%' }}>
              <this.AnimatedGraph>
                <HorizontalBar data={data.productSales} options={options.bar}/>
                <p className="graph-desc">
                  Tires are your most popularly sold product type.
                </p>
              </this.AnimatedGraph>
              <this.AnimatedGraph>
                <Pie data={data.customerBrandPreferences} options={options.pie} />
                <p className="graph-desc">
                  Most of your customers own CAT products.
                </p>
              </this.AnimatedGraph>
            </div>
          }
        </div>
        <div className="seller">
          <h3>Seller Insights</h3>
          { display &&
            <div style={{ width: '100%' }}>
              <this.AnimatedGraph>
                <HorizontalBar data={data.slowSellingProducts} options={options.bar} />
                <p className="graph-desc">
                  You've been holding on to product 2 for three years.
                </p>
              </this.AnimatedGraph>
              <this.AnimatedGraph>
                <Pie data={data.customerStatePreferences} options={options.pie} />
                <p className="graph-desc">
                  Your customers prefer used products.
                </p>
              </this.AnimatedGraph>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Insights;
