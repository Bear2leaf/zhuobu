import Device from "../device/Device.js";

export default class WorkerManager {

    init(device: Device) {
        device.createWorker("dist-worker/index.js", (data, sendMessage) => {
            switch (data.type) {
                case "WorkerInit":
                    sendMessage({
                        type: "SyncState",
                        args: [{
                            foo: "bar"
                        }]
                    });
                    break;
                case "RequestSync":
                    sendMessage({
                        type: "SyncState"
                    });
                    break;
                case "Refresh":
                    device.reload();
                    break;
                case "SendModelTranslation":
                    this.updateModelTranslation!(data.args[0]);
                    break;
            }
        })
    }

    updateModelTranslation?: (translation: [number, number, number]) => void;
}