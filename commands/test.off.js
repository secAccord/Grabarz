const TEST = {
    name:'test',
    display: true,
    description:"Test",
    usage:"?test",
    onlyDevs: true, //tylko developerzy
    groups: [],

    execute: async (msg ,args) => {
        msg.channel.send("Testification!")
    }




}
export default TEST;