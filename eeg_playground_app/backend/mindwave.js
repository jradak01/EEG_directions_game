const neurosky = require('node-neurosky');

let name = 0;
module.exports = (io) => {
    const client = neurosky.createClient({
	    appName: 'EEGPlayground',
	    appKey: '1234567890abcdef...'
    });
    
    client.on('data',function(data){
        name+=1;
        let data_neuro={
            delta: data.eegPower.delta,
            theta: data.eegPower.theta,
            lowAlpha: data.eegPower.lowAlpha,
            highAlpha: data.eegPower.highAlpha,
            lowBeta: data.eegPower.lowBeta,
            highBeta: data.eegPower.highBeta,
            lowGamma: data.eegPower.lowGamma,
            highGamma: data.eegPower.highGamma,
            attention: data.eSense.attention,
            meditation: data.eSense.meditation,
            blink: data.blinkStrength,
            poorSignal: data.poorSignalLevel,
            name: name
        }
        console.log(data_neuro)
        io.sockets.emit('neurodata', data_neuro);
    });
    client.connect();
}

