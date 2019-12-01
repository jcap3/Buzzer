export default class Commons {
    static dataToSendBuilder = (messageType, content = null) => {
        let data = {
            'messageType' : messageType,
            'content': content
        }
        console.log(JSON.stringify(data));
        return JSON.stringify(data);
    }
}