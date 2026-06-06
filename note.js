"use strict";

module.exports = function (RED) {
    function NoteNode(config) {
        RED.nodes.createNode(this, config);
    }

    RED.nodes.registerType("note", NoteNode);
};
