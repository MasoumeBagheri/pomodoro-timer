import React, { Component } from "react";
import PomodoroCount from "../../components/PomodoroCount/PomodoroCount";
import PomodoroSound from "../../components/PomodoroSound/PomodoroSound";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./Timer.css";

class Timer extends Component {
  state = {
    seconds: 0,
    minutes: 25,
    status: "Focus",
    counter: 0,
    secondsCount: 25 * 60,
    isStart: true,
    timerId: 0,
    isStop: true,
    completePomodoroCount: 0,
    COLOR_CODES: {
      info: {
        color: "green",
      },
      default: {
        color: "white",
      },
    },
    remainingPathColor: " ",
    FULL_DASH_ARRAY: 283,
    timeLeft: 0,
    rawTimeFraction: 0,
    strokeDasharray: 0,
    timeLimit: 25 * 60,
  };

  secondsCountCalculate = (min) => {
    this.setState({ secondsCount: min * 60 });
  };

  calculateTimeFraction = () => {
    this.setState(
      {
        rawTimeFraction: this.state.secondsCount / this.state.timeLimit,
      },
      () => {
        this.setState({
          rawTimeFraction:
            this.state.rawTimeFraction -
            (1 / this.state.timeLimit) * (1 - this.state.rawTimeFraction),
        });
      }
    );
    return this.state.rawTimeFraction;
  };

  setCircleDasharray = () => {
    if (this.calculateTimeFraction() * this.state.FULL_DASH_ARRAY <= 0) {
      this.setState({
        strokeDasharray: "283 283",
      });
    } else {
      this.setState({
        strokeDasharray: `${(
          this.calculateTimeFraction() * this.state.FULL_DASH_ARRAY
        ).toFixed(0)} 283`,
      });
    }
  };

  timer = () => {
    this.setState({
      remainingPathColor: this.state.COLOR_CODES.info.color,
    });

    if (
      this.state.minutes === 0 &&
      this.state.seconds === 0 &&
      this.state.status === "Focus" &&
      this.state.counter !== 4
    ) {
      this.setState({ counter: this.state.counter + 1 });
      this.setState(
        {
          status: this.state.counter === 4 ? "Long Break" : "Short Break",
          minutes: this.state.counter === 4 ? 30 : 5,
          seconds: 0,
          timeLimit: this.state.counter === 4 ? 30 * 60 : 5 * 60,
        },
        this.state.counter === 4
          ? this.secondsCountCalculate(30)
          : this.secondsCountCalculate(5)
      );
    }

    if (
      this.state.minutes === 0 &&
      this.state.seconds === 0 &&
      this.state.status === "Short Break"
    ) {
      this.setState(
        { status: "Focus", timeLimit: 25 * 60 },
        this.secondsCountCalculate(25)
      );
    }
    if (
      this.state.minutes === 0 &&
      this.state.seconds === 0 &&
      this.state.counter === 4
    ) {
      this.setState({
        isStart: false,
        completePomodoroCount: this.state.completePomodoroCount + 1,
      });
    }

    this.setState({
      minutes: Math.floor(this.state.secondsCount / 60),
      seconds: this.state.secondsCount % 60,
    });
    if (this.state.minutes === 0 && this.state.seconds === 0) {
      clearInterval(this.state.timerId);
      this.setState({
        isStop: true,
        remainingPathColor: this.state.COLOR_CODES.default.color,
      });
    }
    if (this.state.isStart === false) {
      clearInterval(this.state.timerId);
      this.setState(
        {
          minutes: 25,
          seconds: 0,
          status: "Focus",
          counter: 0,
          isStop: true,
          isStart: true,
          timeLimit: 25 * 60,
        },
        this.secondsCountCalculate(25)
      );
    }

    this.setCircleDasharray();

    this.setState({
      secondsCount: this.state.secondsCount - 1,
    });
  };
  playHandler = () => {
    this.setState(
      {
        isStop: !this.state.isStop,
      },
      () => {
        if (this.state.isStop === false) {
          this.setState({
            timerId: setInterval(this.timer, 1000),
          });
        } else {
          clearInterval(this.state.timerId);
        }
      }
    );
  };

  render() {
    return (
      <Container fluid className="pomodoro">
        <Row className="pomodoro-timer">
          <Col md={12}>
            <Row>
              <Col md={12} className="pomodoro-timer-title ">
                <h2>Pomodoro Timer</h2>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="button-responsive">
                <div className="base-timer">
                  <svg
                    className="base-timer__svg"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g className="base-timer__circle">
                      <circle
                        className="base-timer__path-elapsed"
                        cx="50"
                        cy="50"
                        r="45"
                      ></circle>
                      <path
                        id="base-timer-path-remaining"
                        stroke-dasharray={this.state.strokeDasharray}
                        className={`base-timer__path-remaining ${this.state.remainingPathColor}`}
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                      ></path>
                    </g>
                  </svg>
                  <div id="base-timer-label" className="base-timer__label">
                    <div className="timer">
                      {this.state.minutes === 0 ? (
                        ""
                      ) : (
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.minutes < 10
                            ? "0" + this.state.minutes
                            : this.state.minutes}
                          :
                        </span>
                      )}

                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                      >
                        {this.state.minutes === 0
                          ? this.state.seconds
                          : this.state.seconds < 10
                          ? "0" + this.state.seconds
                          : this.state.seconds}
                      </span>
                    </div>
                    <h3>{this.state.status}</h3>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="button-responsive">
                <div className="button" onClick={this.playHandler}>
                  {this.state.isStop ? (
                    <FaRegPlayCircle />
                  ) : (
                    <FaRegPauseCircle />
                  )}
                </div>
              </Col>
            </Row>
            <Row className="counter-margin">
              <Col md={6} sm={6} xs={6}>
                <div className="background-counter"></div>
                <div className="counter">
                  <PomodoroCount
                    counter={this.state.counter}
                    completePomodoroCount={this.state.completePomodoroCount}
                    status={this.state.status}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                  />
                </div>
              </Col>
              <Col md={6} sm={6} xs={6} className="sound">
                <div>
                  <PomodoroSound
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Timer;
