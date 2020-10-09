const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;

const videoElement = document.getElementById('video')

const startBtn = document.getElementById('startBtn')
const stopBtn = document.getElementById('stopBtn')
const videoSelectionBtn = document.getElementById('videoSelectionBtn')


videoSelectionBtn.onclick = getVideoSources;


async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });

    const videoOptionsMenu = Menu.buildFromTemplate(
        inputSources.map(source => {
            return {
                label: source.name,
                click: () => selectSource(source)
            }
        })
    )

    videoOptionsMenu.popup();
}


async function selectSource(source) {
    videoSelectionBtn.innerText = source.name;
    console.log(source)
    const constraints = {
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        }
    }


    const stream = await navigator
        .mediaDevices
        .getUserMedia(constraints);

    videoElement.srcObject = stream;
    videoElement.play();

}