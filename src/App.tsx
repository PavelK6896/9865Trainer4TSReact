import React, {useState} from 'react';
import './App.css';

import * as dic from "./service/dictionary3";
import {logUtil} from "./util/log1";
import {recorder1, start1, stop1} from "./util/recorder1";
import {speech1} from "./util/speech1";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.maxAlternatives = 10;
recognition.continuous = false;
recognition.interimResults = false;


function App() {
    const [state2, setState2] = useState(
        {
            index1: 0,
            value1: dic.dictionary10[0][0],
            value2: dic.dictionary10[0][1],
            result1: "",
            recording1: false
        })

    let activeState: boolean
    let style1 = {}

    if (state2.recording1)
        recorder1()

    const speak = () => {
        speech1(dic.dictionary10[state2.index1][0], '')
    }

    const back = () => {
        logUtil("back")

        if (state2.index1 <= 0) {
            state2.index1 = dic.dictionary10.length
        }

        setState2({
            ...state2,
            index1: --state2.index1,
            value1: dic.dictionary10[state2.index1][0],
            value2: dic.dictionary10[state2.index1][1],
        })

    }

    const next = () => {
        logUtil("next")

        if (state2.index1 >= dic.dictionary10.length - 1) {
            state2.index1 = -1;
        }

        setState2({
            ...state2,
            index1: ++state2.index1,
            value1: dic.dictionary10[state2.index1][0],
            value2: dic.dictionary10[state2.index1][1],
        })

        speech1(dic.dictionary10[state2.index1][0], dic.dictionary10[state2.index1][1])
    }

    recognition.onresult = (e) => {

        for (const res of e.results[0]) {
            console.log(res.transcript)
            if (res.transcript.toLowerCase() == state2.value1.toLowerCase()) {

                setState2({
                    ...state2,
                    result1: "верно"
                })
                console.log("style")
                next()
                style1 = {
                    color: 'green'
                }
                return
            } else {

                setState2({
                    ...state2,
                    result1: "неверно"
                })

                style1 = {
                    color: 'red'
                }
            }
        }

        activeState = false;
    };

    recognition.onaudiostart = (e) => {
        activeState = true;
    }

    recognition.onaudioend = (e) => {
        if (state2.recording1)
            stop1()
        activeState = false;
    }

    const say = () => {
        logUtil("say")
        if (state2.recording1)
            start1()
        if (activeState) {
            return
        }
        recognition.start();

    }

    return (

        <div>
            <div style={{
                position: "absolute"
            }}>

                <p>{state2.index1}</p>
                <div style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: "flex-end"
                }}>
                    <label>
                        recording
                        <input type={'checkbox'} onClick={(v) => {
                            setState2({...state2, recording1: !state2.recording1})
                        }}/>
                    </label>
                </div>

                <div style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: "space-around"
                }}>
                    <button className={'button1'} style={{}} onClick={back}>back</button>
                    <button className={'button1'} style={{}} onClick={next}>next</button>
                </div>

            </div>


            <div style={{
                height: "100vh",
                background: "rgba(52,114,147,0.83)",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div>
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <h2 style={style1}>{state2.result1}</h2>
                        <h2 onClick={speak} style={style1}>{state2.value1}</h2>
                        <p>{state2.value2}</p>
                    </div>

                    <button className={'button1'} style={{}} onClick={say}>say</button>

                </div>
            </div>
        </div>
    );
}

export default App;
