const engine1 = new SpeechSynthesisUtterance();
engine1.lang = "en-US";

const engine2 = new SpeechSynthesisUtterance();
engine2.lang = "ru";
engine2.rate = 10


export const speech1 = (en: string , ru: string) => {

    engine1.text = en
    window.speechSynthesis.speak(engine1)

    engine2.text = ru
    window.speechSynthesis.speak(engine2)

}
