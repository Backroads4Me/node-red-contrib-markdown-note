module.exports = function(RED) {
    function NoteNode(config) {
        RED.nodes.createNode(this, config);
        // UI-only node - no message processing
    }
    RED.nodes.registerType("note", NoteNode);
};
