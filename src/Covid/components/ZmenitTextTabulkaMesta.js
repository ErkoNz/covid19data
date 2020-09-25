export default function ZmenitTextTabulkaMesta() {
    var element = document.querySelector(".sipkaScrollMesta")
    element.classList.toggle("rotateArrow");

    var element2 = document.querySelector(".tabulkaOkrajDivMain")
    element2.classList.toggle("changeHeight");

    var element3 = document.querySelector(".textPreZObrazenieTabulky")
    element3.classList.toggle("changeText");
    // if (textPreZobrazenieObci.boolean) {
    //     setTextPreZobrazenieObci({
    //         boolean: !textPreZobrazenieObci.boolean,
    //         text: "Schovať údaje o jednotlivých obciach"
    //     })
    // }
    // else {
    //     setTextPreZobrazenieObci({
    //         boolean: !textPreZobrazenieObci.boolean,
    //         text: "Zobraziť údaje o jednotlivých obciach"
    //     })
    // }
}

