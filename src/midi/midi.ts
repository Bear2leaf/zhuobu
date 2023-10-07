import { SongType } from "../audiofont/index.js";
/**
 * Implementation of atob() according to the HTML and Infra specs, except that
 * instead of throwing INVALID_CHARACTER_ERR we return null.
 */
export function atob(data: string) {
    if (arguments.length === 0) {
        throw new TypeError("1 argument required, but only 0 present.");
    }

    // Web IDL requires DOMStrings to just be converted using ECMAScript
    // ToString, which in our case amounts to using a template literal.
    data = `${data}`;
    // "Remove all ASCII whitespace from data."
    data = data.replace(/[ \t\n\f\r]/g, "");
    // "If data's code point length divides by 4 leaving no remainder, then: if data ends
    // with one or two U+003D (=) code points, then remove them from data."
    if (data.length % 4 === 0) {
        data = data.replace(/==?$/, "");
    }
    // "If data's code point length divides by 4 leaving a remainder of 1, then return
    // failure."
    //
    // "If data contains a code point that is not one of
    //
    // U+002B (+)
    // U+002F (/)
    // ASCII alphanumeric
    //
    // then return failure."
    if (data.length % 4 === 1 || /[^+/0-9A-Za-z]/.test(data)) {
        throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    // "Let output be an empty byte sequence."
    let output = "";
    // "Let buffer be an empty buffer that can have bits appended to it."
    //
    // We append bits via left-shift and or.  accumulatedBits is used to track
    // when we've gotten to 24 bits.
    let buffer = 0;
    let accumulatedBits = 0;
    // "Let position be a position variable for data, initially pointing at the
    // start of data."
    //
    // "While position does not point past the end of data:"
    for (let i = 0; i < data.length; i++) {
        // "Find the code point pointed to by position in the second column of
        // Table 1: The Base 64 Alphabet of RFC 4648. Let n be the number given in
        // the first cell of the same row.
        //
        // "Append to buffer the six bits corresponding to n, most significant bit
        // first."
        //
        // atobLookup() implements the table from RFC 4648.
        buffer <<= 6;
        buffer |= atobLookup(data[i]);
        accumulatedBits += 6;
        // "If buffer has accumulated 24 bits, interpret them as three 8-bit
        // big-endian numbers. Append three bytes with values equal to those
        // numbers to output, in the same order, and then empty buffer."
        if (accumulatedBits === 24) {
            output += String.fromCharCode((buffer & 0xff0000) >> 16);
            output += String.fromCharCode((buffer & 0xff00) >> 8);
            output += String.fromCharCode(buffer & 0xff);
            buffer = accumulatedBits = 0;
        }
        // "Advance position by 1."
    }
    // "If buffer is not empty, it contains either 12 or 18 bits. If it contains
    // 12 bits, then discard the last four and interpret the remaining eight as
    // an 8-bit big-endian number. If it contains 18 bits, then discard the last
    // two and interpret the remaining 16 as two 8-bit big-endian numbers. Append
    // the one or two bytes with values equal to those one or two numbers to
    // output, in the same order."
    if (accumulatedBits === 12) {
        buffer >>= 4;
        output += String.fromCharCode(buffer);
    } else if (accumulatedBits === 18) {
        buffer >>= 2;
        output += String.fromCharCode((buffer & 0xff00) >> 8);
        output += String.fromCharCode(buffer & 0xff);
    }
    // "Return output."
    return output;
}
/**
 * A lookup table for atob(), which converts an ASCII character to the
 * corresponding six-bit number.
 */

const keystr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function atobLookup(chr: string) {
    const index = keystr.indexOf(chr);
    // Throw exception if character is not in the lookup string; should not be hit in tests
    if (index === -1) {
        throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    return index;
}

///..................................................................

type EventType = {
    track: number;
    type: number;
    subtype: number;
    length: number;
    msb: number;
    lsb: number;
    data: number[];
    prefix: number;
    tempo: number;
    tempoBPM: number;
    hour: number;
    minutes: number;
    seconds: number;
    frames: number;
    subframes: number;
    key: number;
    scale: number;
    param1: number;
    param2: number;
    param3: number;
    param4: number;
    badsubtype: number;
    channel: number;
    playTime: number;
    index: string,
    delta: number
}
// MIDIEvents : Read and edit events from various sources (ArrayBuffer, Stream)
class MIDIEvents {
    constructor() {
        throw new Error('MIDIEvents function not intended to be run.');
    }
    // Static constants
    // Event types
    static readonly EVENT_META = 0xFF;
    static readonly EVENT_SYSEX = 0xF0;
    static readonly EVENT_DIVSYSEX = 0xF7;
    static readonly EVENT_MIDI = 0x8;
    // Meta event types
    static readonly EVENT_META_SEQUENCE_NUMBER = 0x00;
    static readonly EVENT_META_TEXT = 0x01;
    static readonly EVENT_META_COPYRIGHT_NOTICE = 0x02;
    static readonly EVENT_META_TRACK_NAME = 0x03;
    static readonly EVENT_META_INSTRUMENT_NAME = 0x04;
    static readonly EVENT_META_LYRICS = 0x05;
    static readonly EVENT_META_MARKER = 0x06;
    static readonly EVENT_META_CUE_POINT = 0x07;
    static readonly EVENT_META_MIDI_CHANNEL_PREFIX = 0x20;
    static readonly EVENT_META_END_OF_TRACK = 0x2F;
    static readonly EVENT_META_SET_TEMPO = 0x51;
    static readonly EVENT_META_SMTPE_OFFSET = 0x54;
    static readonly EVENT_META_TIME_SIGNATURE = 0x58;
    static readonly EVENT_META_KEY_SIGNATURE = 0x59;
    static readonly EVENT_META_SEQUENCER_SPECIFIC = 0x7F;
    // MIDI event types
    static readonly EVENT_MIDI_NOTE_OFF = 0x8;
    static readonly EVENT_MIDI_NOTE_ON = 0x9;
    static readonly EVENT_MIDI_NOTE_AFTERTOUCH = 0xA;
    static readonly EVENT_MIDI_CONTROLLER = 0xB;
    static readonly EVENT_MIDI_PROGRAM_CHANGE = 0xC;
    static readonly EVENT_MIDI_CHANNEL_AFTERTOUCH = 0xD;
    static readonly EVENT_MIDI_PITCH_BEND = 0xE;
    // MIDI event sizes
    static readonly MIDI_1PARAM_EVENTS = [
        MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE,
        MIDIEvents.EVENT_MIDI_CHANNEL_AFTERTOUCH,
    ];
    static readonly MIDI_2PARAMS_EVENTS = [
        MIDIEvents.EVENT_MIDI_NOTE_OFF,
        MIDIEvents.EVENT_MIDI_NOTE_ON,
        MIDIEvents.EVENT_MIDI_NOTE_AFTERTOUCH,
        MIDIEvents.EVENT_MIDI_CONTROLLER,
        MIDIEvents.EVENT_MIDI_PITCH_BEND,
    ];
    // Create an event stream parser
    static createParser(stream: DataView, startAt: number, strictMode: boolean) {
        // Private vars
        // Common vars
        let eventTypeByte: number;
        // MIDI events vars
        let MIDIEventType: number;
        let MIDIEventChannel: number;
        let MIDIEventParam1: number;

        const streamReader = {
            position: startAt || 0,
            buffer: stream,
            readUint8: function () {
                return this.buffer.getUint8(this.position++);
            },
            readUint16: function () {
                const v = this.buffer.getUint16(this.position);
                this.position = this.position + 2;
                return v;
            },
            readUint32: function () {
                const v = this.buffer.getUint16(this.position);
                this.position = this.position + 2;
                return v;
            },
            readVarInt: function () {
                let v = 0;
                let i = 0;
                let b;
                while (4 > i++) {
                    b = this.readUint8();

                    if (b & 0x80) {
                        v += (b & 0x7f);
                        v <<= 7;
                    } else {
                        return v + b;
                    }
                }
                throw new Error('0x' + this.position.toString(16) + ':' +
                    ' Variable integer length cannot exceed 4 bytes');
            },
            readBytes: function (length: number) {
                const bytes = [];

                for (; 0 < length; length--) {
                    bytes.push(this.readUint8());
                }
                return bytes;
            },
            pos: function () {
                return '0x' + (this.buffer.byteOffset + this.position).toString(16);
            },
            end: function () {
                return this.position === this.buffer.byteLength;
            },
        };
        // Consume stream till not at start index
        if (0 < startAt) {
            while (startAt--) {
                streamReader.readUint8();
            }
        }
        // creating the parser object
        return {
            // Read the next event
            next: function () {
                // Check available datas
                if (streamReader.end()) {
                    return null;
                }
                // Creating the event
                const event: EventType = {
                    // Memoize the event index
                    index: streamReader.pos(),
                    // Read the delta time
                    delta: streamReader.readVarInt(),
                    track: 0,
                    type: 0,
                    subtype: 0,
                    length: 0,
                    msb: 0,
                    lsb: 0,
                    data: [],
                    prefix: 0,
                    tempo: 0,
                    tempoBPM: 0,
                    hour: 0,
                    minutes: 0,
                    seconds: 0,
                    frames: 0,
                    subframes: 0,
                    key: 0,
                    scale: 0,
                    param1: 0,
                    param2: 0,
                    param3: 0,
                    param4: 0,
                    badsubtype: 0,
                    channel: 0,
                    playTime: 0
                };
                // Read the eventTypeByte
                eventTypeByte = streamReader.readUint8();
                if (0xF0 === (eventTypeByte & 0xF0)) {
                    // Meta events
                    if (eventTypeByte === MIDIEvents.EVENT_META) {
                        event.type = MIDIEvents.EVENT_META;
                        event.subtype = streamReader.readUint8();
                        event.length = streamReader.readVarInt();
                        switch (event.subtype) {
                            case MIDIEvents.EVENT_META_SEQUENCE_NUMBER:
                                if (strictMode && 2 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.msb = streamReader.readUint8();
                                event.lsb = streamReader.readUint8();
                                return event;
                            case MIDIEvents.EVENT_META_TEXT:
                            case MIDIEvents.EVENT_META_COPYRIGHT_NOTICE:
                            case MIDIEvents.EVENT_META_TRACK_NAME:
                            case MIDIEvents.EVENT_META_INSTRUMENT_NAME:
                            case MIDIEvents.EVENT_META_LYRICS:
                            case MIDIEvents.EVENT_META_MARKER:
                            case MIDIEvents.EVENT_META_CUE_POINT:
                                event.data = streamReader.readBytes(event.length);
                                return event;
                            case MIDIEvents.EVENT_META_MIDI_CHANNEL_PREFIX:
                                if (strictMode && 1 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.prefix = streamReader.readUint8();
                                return event;
                            case MIDIEvents.EVENT_META_END_OF_TRACK:
                                if (strictMode && 0 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                return event;
                            case MIDIEvents.EVENT_META_SET_TEMPO:
                                if (strictMode && 3 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Tempo meta event length must be 3.');
                                }
                                event.tempo = (
                                    (streamReader.readUint8() << 16) +
                                    (streamReader.readUint8() << 8) +
                                    streamReader.readUint8());
                                event.tempoBPM = 60000000 / event.tempo;
                                return event;
                            case MIDIEvents.EVENT_META_SMTPE_OFFSET:
                                if (strictMode && 5 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.hour = streamReader.readUint8();
                                if (strictMode && 23 < event.hour) {
                                    throw new Error(streamReader.pos() + ' SMTPE offset hour value must' +
                                        ' be part of 0-23.');
                                }
                                event.minutes = streamReader.readUint8();
                                if (strictMode && 59 < event.minutes) {
                                    throw new Error(streamReader.pos() + ' SMTPE offset minutes value' +
                                        ' must be part of 0-59.');
                                }
                                event.seconds = streamReader.readUint8();
                                if (strictMode && 59 < event.seconds) {
                                    throw new Error(streamReader.pos() + ' SMTPE offset seconds value' +
                                        ' must be part of 0-59.');
                                }
                                event.frames = streamReader.readUint8();
                                if (strictMode && 30 < event.frames) {
                                    throw new Error(streamReader.pos() + ' SMTPE offset frames value must' +
                                        ' be part of 0-30.');
                                }
                                event.subframes = streamReader.readUint8();
                                if (strictMode && 99 < event.subframes) {
                                    throw new Error(streamReader.pos() + ' SMTPE offset subframes value' +
                                        ' must be part of 0-99.');
                                }
                                return event;
                            case MIDIEvents.EVENT_META_KEY_SIGNATURE:
                                if (strictMode && 2 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.key = streamReader.readUint8();
                                if (strictMode && (-7 > event.key || 7 < event.key)) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.scale = streamReader.readUint8();
                                if (strictMode && 0 !== event.scale && 1 !== event.scale) {
                                    throw new Error(streamReader.pos() + ' Key signature scale value must' +
                                        ' be 0 or 1.');
                                }
                                return event;
                            case MIDIEvents.EVENT_META_TIME_SIGNATURE:
                                if (strictMode && 4 !== event.length) {
                                    throw new Error(streamReader.pos() + ' Bad metaevent length.');
                                }
                                event.data = streamReader.readBytes(event.length);
                                event.param1 = event.data[0];
                                event.param2 = event.data[1];
                                event.param3 = event.data[2];
                                event.param4 = event.data[3];
                                return event;
                            case MIDIEvents.EVENT_META_SEQUENCER_SPECIFIC:
                                event.data = streamReader.readBytes(event.length);
                                return event;
                            default:
                                if (strictMode) {
                                    throw new Error(streamReader.pos() + ' Unknown meta event type ' +
                                        '(' + event.subtype.toString(16) + ').');
                                }
                                event.data = streamReader.readBytes(event.length);
                                return event;
                        }
                        // System events
                    } else if (eventTypeByte === MIDIEvents.EVENT_SYSEX ||
                        eventTypeByte === MIDIEvents.EVENT_DIVSYSEX) {
                        event.type = eventTypeByte;
                        event.length = streamReader.readVarInt();
                        event.data = streamReader.readBytes(event.length);
                        return event;
                        // Unknown event, assuming it's system like event
                    } else {
                        if (strictMode) {
                            throw new Error(streamReader.pos() + ' Unknown event type ' +
                                eventTypeByte.toString(16) + ', Delta: ' + event.delta + '.');
                        }
                        event.type = eventTypeByte;
                        event.badsubtype = streamReader.readVarInt();
                        event.length = streamReader.readUint8();
                        event.data = streamReader.readBytes(event.length);
                        return event;
                    }
                    // MIDI eventsdestination[index++]
                } else {
                    // running status
                    if (0 === (eventTypeByte & 0x80)) {
                        if (!(MIDIEventType)) {
                            throw new Error(streamReader.pos() + ' Running status without previous event');
                        }
                        MIDIEventParam1 = eventTypeByte;
                    } else {
                        MIDIEventType = eventTypeByte >> 4;
                        MIDIEventChannel = eventTypeByte & 0x0F;
                        MIDIEventParam1 = streamReader.readUint8();
                    }
                    event.type = MIDIEvents.EVENT_MIDI;
                    event.subtype = MIDIEventType;
                    event.channel = MIDIEventChannel;
                    event.param1 = MIDIEventParam1;
                    switch (MIDIEventType) {
                        case MIDIEvents.EVENT_MIDI_NOTE_OFF:
                            event.param2 = streamReader.readUint8();
                            return event;
                        case MIDIEvents.EVENT_MIDI_NOTE_ON:
                            event.param2 = streamReader.readUint8();

                            // If velocity is 0, it's a note off event in fact
                            if (!event.param2) {
                                event.subtype = MIDIEvents.EVENT_MIDI_NOTE_OFF;
                                event.param2 = 127; // Find a standard telling what to do here
                            }
                            return event;
                        case MIDIEvents.EVENT_MIDI_NOTE_AFTERTOUCH:
                            event.param2 = streamReader.readUint8();
                            return event;
                        case MIDIEvents.EVENT_MIDI_CONTROLLER:
                            event.param2 = streamReader.readUint8();
                            return event;
                        case MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE:
                            return event;
                        case MIDIEvents.EVENT_MIDI_CHANNEL_AFTERTOUCH:
                            return event;
                        case MIDIEvents.EVENT_MIDI_PITCH_BEND:
                            event.param2 = streamReader.readUint8();
                            return event;
                        default:
                            if (strictMode) {
                                throw new Error(streamReader.pos() + ' Unknown MIDI event type ' +
                                    '(' + MIDIEventType.toString(16) + ').');
                            }
                            return event;
                    }
                }
            },
        };
    };

    // Return the buffer length needed to encode the given events
    static writeToTrack(events: EventType[], destination: Uint8Array, strictMode?: boolean) {
        let index = 0;

        // Converting each event to binary MIDI datas
        for (let i = 0, j = events.length; i < j; i++) {
            // Writing delta value
            if (events[i].delta >>> 28) {
                throw Error('Event #' + i + ': Maximum delta time value reached (' +
                    events[i].delta + '/134217728 max)');
            }
            if (events[i].delta >>> 21) {
                destination[index++] = ((events[i].delta >>> 21) & 0x7F) | 0x80;
            }
            if (events[i].delta >>> 14) {
                destination[index++] = ((events[i].delta >>> 14) & 0x7F) | 0x80;
            }
            if (events[i].delta >>> 7) {
                destination[index++] = ((events[i].delta >>> 7) & 0x7F) | 0x80;
            }
            destination[index++] = (events[i].delta & 0x7F);
            // MIDI Events encoding
            if (events[i].type === MIDIEvents.EVENT_MIDI) {
                // Adding the byte of subtype + channel
                destination[index++] = (events[i].subtype << 4) + events[i].channel;
                // Adding the byte of the first params
                destination[index++] = events[i].param1;
                // Adding a byte for the optionnal second param
                if (-1 !== MIDIEvents.MIDI_2PARAMS_EVENTS.indexOf(events[i].subtype)) {
                    destination[index++] = events[i].param2;
                }
                // META / SYSEX events encoding
            } else {
                // Adding the event type byte
                destination[index++] = events[i].type;
                // Adding the META event subtype byte
                if (events[i].type === MIDIEvents.EVENT_META) {
                    destination[index++] = events[i].subtype;
                }
                // Writing the event length bytes
                if (events[i].length >>> 28) {
                    throw Error('Event #' + i + ': Maximum length reached (' +
                        events[i].length + '/134217728 max)');
                }
                if (events[i].length >>> 21) {
                    destination[index++] = ((events[i].length >>> 21) & 0x7F) | 0x80;
                }
                if (events[i].length >>> 14) {
                    destination[index++] = ((events[i].length >>> 14) & 0x7F) | 0x80;
                }
                if (events[i].length >>> 7) {
                    destination[index++] = ((events[i].length >>> 7) & 0x7F) | 0x80;
                }
                destination[index++] = (events[i].length & 0x7F);
                if (events[i].type === MIDIEvents.EVENT_META) {
                    switch (events[i].subtype) {
                        case MIDIEvents.EVENT_META_SEQUENCE_NUMBER:
                            destination[index++] = events[i].msb;
                            destination[index++] = events[i].lsb;
                            break;
                        case MIDIEvents.EVENT_META_TEXT:
                        case MIDIEvents.EVENT_META_COPYRIGHT_NOTICE:
                        case MIDIEvents.EVENT_META_TRACK_NAME:
                        case MIDIEvents.EVENT_META_INSTRUMENT_NAME:
                        case MIDIEvents.EVENT_META_LYRICS:
                        case MIDIEvents.EVENT_META_MARKER:
                        case MIDIEvents.EVENT_META_CUE_POINT:
                            for (let k = 0, l = events[i].length; k < l; k++) {
                                destination[index++] = events[i].data[k];
                            }
                            break;
                        case MIDIEvents.EVENT_META_MIDI_CHANNEL_PREFIX:
                            destination[index++] = events[i].prefix;
                            break;
                        case MIDIEvents.EVENT_META_END_OF_TRACK:
                            break;
                        case MIDIEvents.EVENT_META_SET_TEMPO:
                            destination[index++] = (events[i].tempo >> 16);
                            destination[index++] = (events[i].tempo >> 8) & 0xFF;
                            destination[index++] = events[i].tempo & 0xFF;
                            break;
                        case MIDIEvents.EVENT_META_SMTPE_OFFSET:
                            if (strictMode && 23 < events[i].hour) {
                                throw new Error('Event #' + i + ': SMTPE offset hour value must be' +
                                    ' part of 0-23.');
                            }
                            destination[index++] = events[i].hour;
                            if (strictMode && 59 < events[i].minutes) {
                                throw new Error('Event #' + i + ': SMTPE offset minutes value must' +
                                    ' be part of 0-59.');
                            }
                            destination[index++] = events[i].minutes;
                            if (strictMode && 59 < events[i].seconds) {
                                throw new Error('Event #' + i + ': SMTPE offset seconds value must' +
                                    ' be part of 0-59.');
                            }
                            destination[index++] = events[i].seconds;
                            if (strictMode && 30 < events[i].frames) {
                                throw new Error('Event #' + i + ': SMTPE offset frames amount must' +
                                    ' be part of 0-30.');
                            }
                            destination[index++] = events[i].frames;
                            if (strictMode && 99 < events[i].subframes) {
                                throw new Error('Event #' + i + ': SMTPE offset subframes amount' +
                                    ' must be part of 0-99.');
                            }
                            destination[index++] = events[i].subframes;
                            break;
                        case MIDIEvents.EVENT_META_KEY_SIGNATURE:
                            if ('number' != typeof events[i].key || -7 > events[i].key ||
                                7 < events[i].scale) {
                                throw new Error('Event #' + i + ':The key signature key must be' +
                                    ' between -7 and 7');
                            }
                            if ('number' !== typeof events[i].scale ||
                                0 > events[i].scale || 1 < events[i].scale) {
                                throw new Error('Event #' + i + ':' +
                                    'The key signature scale must be 0 or 1');
                            }
                            destination[index++] = events[i].key;
                            destination[index++] = events[i].scale;
                            break;
                        // Not implemented
                        case MIDIEvents.EVENT_META_TIME_SIGNATURE:
                        case MIDIEvents.EVENT_META_SEQUENCER_SPECIFIC:
                        default:
                            for (let k = 0, l = events[i].length; k < l; k++) {
                                destination[index++] = events[i].data[k];
                            }
                            break;
                    }
                    // Adding bytes corresponding to the sysex event datas
                } else {
                    for (let k = 0, l = events[i].length; k < l; k++) {
                        destination[index++] = events[i].data[k];
                    }
                }
            }
        }
    };

    // Return the buffer length needed to encode the given events
    static getRequiredBufferLength(events: EventType[]) {
        let bufferLength = 0;
        // Calculating the track size by adding events lengths
        for (let i = 0, j = events.length; i < j; i++) {
            // Computing necessary bytes to encode the delta value
            bufferLength +=
                events[i].delta >>> 21 ? 4 :
                    events[i].delta >>> 14 ? 3 :
                        events[i].delta >>> 7 ? 2 : 1;
            // MIDI Events have various fixed lengths
            if (events[i].type === MIDIEvents.EVENT_MIDI) {
                // Adding a byte for subtype + channel
                bufferLength++;
                // Adding a byte for the first params
                bufferLength++;
                // Adding a byte for the optionnal second param
                if (-1 !== MIDIEvents.MIDI_2PARAMS_EVENTS.indexOf(events[i].subtype)) {
                    bufferLength++;
                }
                // META / SYSEX events lengths are self defined
            } else {
                // Adding a byte for the event type
                bufferLength++;
                // Adding a byte for META events subtype
                if (events[i].type === MIDIEvents.EVENT_META) {
                    bufferLength++;
                }
                // Adding necessary bytes to encode the length
                bufferLength +=
                    events[i].length >>> 21 ? 4 :
                        events[i].length >>> 14 ? 3 :
                            events[i].length >>> 7 ? 2 : 1;
                // Adding bytes corresponding to the event length
                bufferLength += events[i].length;
            }
        }
        return bufferLength;
    };

}

///...........................................

// MIDIFileHeader : Read and edit a MIDI header chunk in a given ArrayBuffer
class MIDIFileHeader {
    datas: DataView;

    constructor(buffer?: ArrayBuffer, strictMode?: boolean) {
        let a;
        // No buffer creating him
        if (!buffer) {
            a = new Uint8Array(MIDIFileHeader.HEADER_LENGTH);
            // Adding the header id (MThd)
            a[0] = 0x4D;
            a[1] = 0x54;
            a[2] = 0x68;
            a[3] = 0x64;
            // Adding the header chunk size
            a[4] = 0x00;
            a[5] = 0x00;
            a[6] = 0x00;
            a[7] = 0x06;
            // Adding the file format (1 here cause it's the most commonly used)
            a[8] = 0x00;
            a[9] = 0x01;
            // Adding the track count (1 cause it's a new file)
            a[10] = 0x00;
            a[11] = 0x01;
            // Adding the time division (192 ticks per beat)
            a[12] = 0x00;
            a[13] = 0xC0;
            // saving the buffer
            this.datas = new DataView(a.buffer, 0, MIDIFileHeader.HEADER_LENGTH);
            // Parsing the given buffer
        } else {
            if (!(buffer instanceof ArrayBuffer)) {
                throw Error('Invalid buffer received.');
            }
            this.datas = new DataView(buffer, 0, MIDIFileHeader.HEADER_LENGTH);
            // Reading MIDI header chunk
            if (!(
                'M' === String.fromCharCode(this.datas.getUint8(0)) &&
                'T' === String.fromCharCode(this.datas.getUint8(1)) &&
                'h' === String.fromCharCode(this.datas.getUint8(2)) &&
                'd' === String.fromCharCode(this.datas.getUint8(3)))) {
                throw new Error('Invalid MIDIFileHeader : MThd prefix not found');
            }
            // Reading chunk length
            if (6 !== this.datas.getUint32(4)) {
                throw new Error('Invalid MIDIFileHeader : Chunk length must be 6');
            }
        }
    }

    // Static constants
    static readonly HEADER_LENGTH = 14;
    static readonly FRAMES_PER_SECONDS = 1;
    static readonly TICKS_PER_BEAT = 2;

    // MIDI file format
    getFormat() {
        const format = this.datas.getUint16(8);
        if (0 !== format && 1 !== format && 2 !== format) {
            throw new Error('Invalid MIDI file : MIDI format (' + format + '),' +
                ' format can be 0, 1 or 2 only.');
        }
        return format;
    };

    setFormat(format: 0 | 1 | 2) {
        if (0 !== format && 1 !== format && 2 !== format) {
            throw new Error('Invalid MIDI format given (' + format + '),' +
                ' format can be 0, 1 or 2 only.');
        }
        this.datas.setUint16(8, format);
    };

    // Number of tracks
    getTracksCount() {
        return this.datas.getUint16(10);
    };

    setTracksCount(n: number) {
        return this.datas.setUint16(10, n);
    };

    // Tick compute
    getTickResolution(tempo?: number) {
        // Frames per seconds
        if (this.datas.getUint16(12) & 0x8000) {
            return 1000000 / (this.getSMPTEFrames() * this.getTicksPerFrame());
            // Ticks per beat
        }
        // Default MIDI tempo is 120bpm, 500ms per beat
        tempo = tempo || 500000;
        return tempo / this.getTicksPerBeat();
    };

    // Time division type
    getTimeDivision() {
        if (this.datas.getUint16(12) & 0x8000) {
            return MIDIFileHeader.FRAMES_PER_SECONDS;
        }
        return MIDIFileHeader.TICKS_PER_BEAT;
    };

    // Ticks per beat
    getTicksPerBeat() {
        const divisionWord = this.datas.getUint16(12);
        if (divisionWord & 0x8000) {
            throw new Error('Time division is not expressed as ticks per beat.');
        }
        return divisionWord;
    };

    setTicksPerBeat(ticksPerBeat: number) {
        this.datas.setUint16(12, ticksPerBeat & 0x7FFF);
    };

    // Frames per seconds
    getSMPTEFrames() {
        const divisionWord = this.datas.getUint16(12);
        let smpteFrames;

        if (!(divisionWord & 0x8000)) {
            throw new Error('Time division is not expressed as frames per seconds.');
        }
        smpteFrames = divisionWord & 0x7F00;
        if (-1 === [24, 25, 29, 30].indexOf(smpteFrames)) {
            throw new Error('Invalid SMPTE frames value (' + smpteFrames + ').');
        }
        return 29 === smpteFrames ? 29.97 : smpteFrames;
    };

    getTicksPerFrame() {
        const divisionWord = this.datas.getUint16(12);

        if (!(divisionWord & 0x8000)) {
            throw new Error('Time division is not expressed as frames per seconds.');
        }
        return divisionWord & 0x00FF;
    };

    setSMTPEDivision(smpteFrames: number, ticksPerFrame: number) {
        if (29.97 === smpteFrames) {
            smpteFrames = 29;
        }
        if (-1 === [24, 25, 29, 30].indexOf(smpteFrames)) {
            throw new Error('Invalid SMPTE frames value given (' + smpteFrames + ').');
        }
        if (0 > ticksPerFrame || 0xFF < ticksPerFrame) {
            throw new Error('Invalid ticks per frame value given (' + smpteFrames + ').');
        }
        this.datas.setUint8(12, 0x80 | smpteFrames);
        this.datas.setUint8(13, ticksPerFrame);
    };
}
///...........................................
// MIDIFileTrack : Read and edit a MIDI track chunk in a given ArrayBuffer
class MIDIFileTrack {
    datas: DataView;
    constructor(buffer?: ArrayBuffer, start = 0, strictMode = false) {
        let a;
        let trackLength;

        // no buffer, creating him
        if (!buffer) {
            a = new Uint8Array(12);
            // Adding the empty track header (MTrk)
            a[0] = 0x4D;
            a[1] = 0x54;
            a[2] = 0x72;
            a[3] = 0x6B;
            // Adding the empty track size (4)
            a[4] = 0x00;
            a[5] = 0x00;
            a[6] = 0x00;
            a[7] = 0x04;
            // Adding the track end event
            a[8] = 0x00;
            a[9] = 0xFF;
            a[10] = 0x2F;
            a[11] = 0x00;
            // Saving the buffer
            this.datas = new DataView(a.buffer, 0, MIDIFileTrack.HDR_LENGTH + 4);
            // parsing the given buffer
        } else {
            if (!(buffer instanceof ArrayBuffer)) {
                throw new Error('Invalid buffer received.');
            }
            // Buffer length must size at least like an  empty track (8+3bytes)
            if (12 > buffer.byteLength - start) {
                throw new Error('Invalid MIDIFileTrack (0x' + start.toString(16) + ') :' +
                    ' Buffer length must size at least 12bytes');
            }
            // Creating a temporary view to read the track header
            this.datas = new DataView(buffer, start, MIDIFileTrack.HDR_LENGTH);
            // Reading MIDI track header chunk
            if (!(
                'M' === String.fromCharCode(this.datas.getUint8(0)) &&
                'T' === String.fromCharCode(this.datas.getUint8(1)) &&
                'r' === String.fromCharCode(this.datas.getUint8(2)) &&
                'k' === String.fromCharCode(this.datas.getUint8(3)))) {
                throw new Error('Invalid MIDIFileTrack (0x' + start.toString(16) + ') :' +
                    ' MTrk prefix not found');
            }
            // Reading the track length
            trackLength = this.getTrackLength();
            if (buffer.byteLength - start < trackLength) {
                throw new Error('Invalid MIDIFileTrack (0x' + start.toString(16) + ') :' +
                    ' The track size exceed the buffer length.');
            }
            // Creating the final DataView
            this.datas = new DataView(buffer, start, MIDIFileTrack.HDR_LENGTH + trackLength);
            // Trying to find the end of track event
            if (!(
                0xFF === this.datas.getUint8(MIDIFileTrack.HDR_LENGTH + (trackLength - 3)) &&
                0x2F === this.datas.getUint8(MIDIFileTrack.HDR_LENGTH + (trackLength - 2)) &&
                0x00 === this.datas.getUint8(MIDIFileTrack.HDR_LENGTH + (trackLength - 1)))) {
                throw new Error('Invalid MIDIFileTrack (0x' + start.toString(16) + ') :' +
                    ' No track end event found at the expected index' +
                    ' (' + (MIDIFileTrack.HDR_LENGTH + (trackLength - 1)).toString(16) + ').');
            }
        }
    }

    // Static constants
    static readonly HDR_LENGTH = 8;

    // Track length
    getTrackLength() {
        return this.datas.getUint32(4);
    };

    setTrackLength(trackLength: number) {
        return this.datas.setUint32(4, trackLength);
    };

    // Read track contents
    getTrackContent() {
        return new DataView(this.datas.buffer,
            this.datas.byteOffset + MIDIFileTrack.HDR_LENGTH,
            this.datas.byteLength - MIDIFileTrack.HDR_LENGTH);
    };

    // Set track content
    setTrackContent(dataView: Uint8Array) {
        let origin;
        let destination;
        let i;
        let j;
        // Calculating the track length
        const trackLength = dataView.byteLength - dataView.byteOffset;

        // Track length must size at least like an  empty track (4bytes)
        if (4 > trackLength) {
            throw new Error('Invalid track length, must size at least 4bytes');
        }
        this.datas = new DataView(
            new Uint8Array(MIDIFileTrack.HDR_LENGTH + trackLength).buffer);
        // Adding the track header (MTrk)
        this.datas.setUint8(0, 0x4D); // M
        this.datas.setUint8(1, 0x54); // T
        this.datas.setUint8(2, 0x72); // r
        this.datas.setUint8(3, 0x6B); // k
        // Adding the track size
        this.datas.setUint32(4, trackLength);
        // Copying the content
        origin = new Uint8Array(dataView.buffer, dataView.byteOffset,
            dataView.byteLength);
        destination = new Uint8Array(this.datas.buffer,
            MIDIFileTrack.HDR_LENGTH,
            trackLength);
        for (let i = 0, j = origin.length; i < j; i++) {
            destination[i] = origin[i];
        }
    };
}
///...........................................


// MIDIFile : Read (and soon edit) a MIDI file in a given ArrayBuffer


function ensureArrayBuffer(buf: ArrayBuffer | Uint8Array) {
    if (buf) {
        if (buf instanceof ArrayBuffer) {
            return buf;
        }
        if (buf instanceof Uint8Array) {
            // Copy/convert to standard Uint8Array, because derived classes like
            // node.js Buffers might have unexpected data in the .buffer property.
            return new Uint8Array(buf).buffer;
        }
    }
    throw new Error('Unsupported buffer type, need ArrayBuffer or Uint8Array');
}

// Constructor
export class MIDIFile {
    private readonly header: MIDIFileHeader;
    private readonly tracks: MIDIFileTrack[];
    constructor(buffer?: ArrayBuffer, strictMode: boolean = false) {
        let track;
        let curIndex;

        // If not buffer given, creating a new MIDI file
        if (!buffer) {
            // Creating the content
            this.header = new MIDIFileHeader();
            this.tracks = [new MIDIFileTrack()];
            // if a buffer is provided, parsing him
        } else {
            buffer = ensureArrayBuffer(buffer);
            // Minimum MIDI file size is a headerChunk size (14bytes)
            // and an empty track (8+3bytes)
            if (25 > buffer.byteLength) {
                throw new Error('A buffer of a valid MIDI file must have, at least, a' +
                    ' size of 25bytes.');
            }
            // Reading header
            this.header = new MIDIFileHeader(buffer, strictMode);
            this.tracks = [];
            curIndex = MIDIFileHeader.HEADER_LENGTH;
            // Reading tracks
            for (let i = 0, j = this.header.getTracksCount(); i < j; i++) {
                // Testing the buffer length
                if (strictMode && curIndex >= buffer.byteLength - 1) {
                    throw new Error('Couldn\'t find datas corresponding to the track #' + i + '.');
                }
                // Creating the track object
                track = new MIDIFileTrack(buffer, curIndex, strictMode);
                this.tracks.push(track);
                // Updating index to the track end
                curIndex += track.getTrackLength() + 8;
            }
            // Testing integrity : curIndex should be at the end of the buffer
            if (strictMode && curIndex !== buffer.byteLength) {
                throw new Error('It seems that the buffer contains too much datas.');
            }
        }
    }
    startNote(event: EventType, song: SongType) {
        const track = this.takeTrack(event.channel, song);
        track.notes.push({
            when: event.playTime / 1000,
            pitch: event.param1,
            velocity: event.param2,
            duration: 0.0000001,
            slides: []
        });
    }
    closeNote(event: EventType, song: SongType) {
        const track = this.takeTrack(event.channel, song);
        for (let i = 0; i < track.notes.length; i++) {
            if (track.notes[i].duration == 0.0000001 //
                && track.notes[i].pitch == event.param1 //
                && track.notes[i].when < event.playTime / 1000) {
                track.notes[i].duration = event.playTime / 1000 - track.notes[i].when;
                break;
            }
        }
    }
    addSlide(event: EventType, song: SongType, pitchBendRange: number) {
        const track = this.takeTrack(event.channel, song);
        for (let i = 0; i < track.notes.length; i++) {
            if (track.notes[i].duration == 0.0000001 //
                && track.notes[i].when < event.playTime / 1000) {
                //if (Math.abs(track.notes[i].shift) < Math.abs(event.param2 - 64) / 6) {
                //track.notes[i].shift = (event.param2 - 64) / 6;
                //console.log(event.param2-64);
                //}
                track.notes[i].slides.push({
                    //pitch: track.notes[i].pitch + (event.param2 - 64) / 6,
                    delta: (event.param2 - 64) / 64 * pitchBendRange,
                    when: event.playTime / 1000 - track.notes[i].when
                });
            }
        }
    }
    startDrum(event: EventType, song: SongType) {
        const beat = this.takeBeat(event.param1, song);
        beat.notes.push({
            when: event.playTime / 1000
        });
    }
    takeTrack(n: number, song: SongType) {
        for (let i = 0; i < song.tracks.length; i++) {
            if (song.tracks[i].n == n) {
                return song.tracks[i];
            }
        }
        const track = {
            n: n,
            notes: [],
            volume: 1,
            program: 0
        };
        song.tracks.push(track);
        return track;
    }
    takeBeat(n: number, song: SongType) {
        for (let i = 0; i < song.beats.length; i++) {
            if (song.beats[i].n == n) {
                return song.beats[i];
            }
        }
        const beat = {
            n: n,
            notes: [],
            volume: 1
        };
        song.beats.push(beat);
        return beat;
    }
    parseSong() {
        const song = {
            duration: 0,
            tracks: [],
            beats: []
        };
        const events = this.getMidiEvents();
        console.log(events);
        // To set the pitch-bend range, three to four consecutive EVENT_MIDI_CONTROLLER messages must have consistent contents.
        let expectedPitchBendRangeMessageNumber = 1; // counts which pitch-bend range message can be expected next: number 1 (can be sent any time, except after pitch-bend range messages number 1 or 2), number 2 (required after number 1), number 3 (required after number 2), or number 4 (optional)
        let expectedPitchBendRangeChannel = null;
        const pitchBendRange = Array(16).fill(2); // Default pitch-bend range is 2 semitones.
        for (let i = 0; i < events.length; i++) {
            const expectedPitchBendRangeMessageNumberOld = expectedPitchBendRangeMessageNumber;
            //console.log('		next',events[i]);
            if (song.duration < events[i].playTime / 1000) {
                song.duration = events[i].playTime / 1000;
            }
            if (events[i].subtype == MIDIEvents.EVENT_MIDI_NOTE_ON) {
                if (events[i].channel == 9) {
                    if (events[i].param1 >= 35 && events[i].param1 <= 81) {
                        this.startDrum(events[i], song);
                    } else {
                        console.log('wrong drum', events[i]);
                    }
                } else {
                    if (events[i].param1 >= 0 && events[i].param1 <= 127) {
                        //console.log('start', events[i].param1);
                        this.startNote(events[i], song);
                    } else {
                        console.log('wrong tone', events[i]);
                    }
                }
            } else {
                if (events[i].subtype == MIDIEvents.EVENT_MIDI_NOTE_OFF) {
                    if (events[i].channel != 9) {
                        this.closeNote(events[i], song);
                        //console.log('close', events[i].param1);
                    }
                } else {
                    if (events[i].subtype == MIDIEvents.EVENT_MIDI_PROGRAM_CHANGE) {
                        if (events[i].channel != 9) {
                            const track = this.takeTrack(events[i].channel, song);
                            track.program = events[i].param1;
                        } else {
                            console.log('skip program for drums');
                        }
                    } else {
                        if (events[i].subtype == MIDIEvents.EVENT_MIDI_CONTROLLER) {
                            if (events[i].param1 == 7) {
                                if (events[i].channel != 9) { // TODO why not set loudness for drums?
                                    const track = this.takeTrack(events[i].channel, song);
                                    track.volume = events[i].param2 / 127 || 0.000001;
                                    //console.log('volume', track.volume,'for',events[i].channel);
                                }
                            } else if (
                                (expectedPitchBendRangeMessageNumber == 1 && events[i].param1 == 0x65 && events[i].param2 == 0x00) ||
                                (expectedPitchBendRangeMessageNumber == 2 && events[i].param1 == 0x64 && events[i].param2 == 0x00) ||
                                (expectedPitchBendRangeMessageNumber == 3 && events[i].param1 == 0x06) ||
                                (expectedPitchBendRangeMessageNumber == 4 && events[i].param1 == 0x26)
                            ) {
                                if (expectedPitchBendRangeMessageNumber > 1 && events[i].channel != expectedPitchBendRangeChannel) {
                                    //throw Error('Unexpected channel number in non-first pitch-bend RANGE (SENSITIVITY) message. MIDI file might be corrupt.');
                                    //don't care
                                }
                                expectedPitchBendRangeChannel = events[i].channel;
                                if (expectedPitchBendRangeMessageNumber == 3) {
                                    pitchBendRange[events[i].channel] = events[i].param2; // in semitones
                                    console.log('pitchBendRange', pitchBendRange);
                                }
                                if (expectedPitchBendRangeMessageNumber == 4) {
                                    pitchBendRange[events[i].channel] += events[i].param2 / 100; // convert cents to semitones, add to semitones set in the previous MIDI message
                                    console.log('pitchBendRange', pitchBendRange);
                                }
                                expectedPitchBendRangeMessageNumber++;
                                if (expectedPitchBendRangeMessageNumber == 5) {
                                    expectedPitchBendRangeMessageNumber = 1;
                                }
                            } else {
                                //console.log('controller', events[i]);
                            }
                        } else {
                            if (events[i].subtype == MIDIEvents.EVENT_MIDI_PITCH_BEND) {
                                //console.log('	bend', events[i].channel, events[i].param1, events[i].param2);
                                this.addSlide(events[i], song, pitchBendRange[events[i].channel]);
                            } else {
                                console.log('unknown', events[i].channel, events[i]);
                            };
                        }
                    }
                }
            }
            if (expectedPitchBendRangeMessageNumberOld == expectedPitchBendRangeMessageNumber) { // If the current message wasn't an expected pitch-bend range message
                if (expectedPitchBendRangeMessageNumberOld >= 2 && expectedPitchBendRangeMessageNumberOld <= 3) {
                    //throw Error('Pitch-bend RANGE (SENSITIVITY) messages ended prematurely. MIDI file might be corrupt.');
                    //don't care
                }
                if (expectedPitchBendRangeMessageNumberOld == 4) { // The fourth message is optional, so since it wasn't sent, the setting of the pitch-bend range is done, and we might expect the first pitch-bend range message some time in the future
                    expectedPitchBendRangeMessageNumber = 1;
                }
            }
        }
        return song;
    }
    // Events reading helpers
    getEvents(type: number, subtype?: number) {
        let playTime = 0;
        let filteredEvents = [];
        let format = this.header.getFormat();
        let tickResolution = this.header.getTickResolution();

        // Reading events
        // if the read is sequential
        if (1 !== format || 1 === this.tracks.length) {
            for (let i = 0, j = this.tracks.length; i < j; i++) {
                // reset playtime if format is 2
                playTime = (2 === format && playTime ? playTime : 0);
                const events = MIDIEvents.createParser(this.tracks[i].getTrackContent(), 0, false);
                // loooping through events
                let event = events.next();
                while (event) {
                    playTime += event.delta ? (event.delta * tickResolution) / 1000 : 0;
                    if (event.type === MIDIEvents.EVENT_META) {
                        // tempo change events
                        if (event.subtype === MIDIEvents.EVENT_META_SET_TEMPO) {
                            tickResolution = this.header.getTickResolution(event.tempo);
                        }
                    }
                    // push the asked events
                    if (((!type) || event.type === type) &&
                        ((!subtype) || (event.subtype && event.subtype === subtype))) {
                        event.playTime = playTime;
                        filteredEvents.push(event);
                    }
                    event = events.next();
                }
            }
            // the read is concurrent
        } else {
            const trackParsers: {
                curEvent: EventType | null;
                parser: {
                    next(): EventType | null;
                };
            }[] = [];
            let smallestDelta = -1;

            // Creating parsers
            for (let i = 0, j = this.tracks.length; i < j; i++) {
                const parser = MIDIEvents.createParser(
                    this.tracks[i].getTrackContent(), 0, false);
                trackParsers[i] = {
                    parser,
                    curEvent: parser.next()
                }
            }
            // Filling events
            do {
                smallestDelta = -1;
                // finding the smallest event
                for (let i = 0, j = trackParsers.length; i < j; i++) {
                    if (trackParsers[i].curEvent !== null) {
                        const curEvent = trackParsers[i].curEvent;
                        if (curEvent === undefined || curEvent === null) {
                            throw new Error('Unexpected undefined event');
                        }
                        if (-1 === smallestDelta) {
                            smallestDelta = i;
                        } else {
                            const smallestCurEvent = trackParsers[smallestDelta].curEvent;
                            if (smallestCurEvent === undefined || smallestCurEvent === null) {
                                throw new Error('Unexpected undefined event');
                            }
                            if (curEvent.delta <
                                smallestCurEvent.delta) {
                                smallestDelta = i;
                            }
                        }
                    }
                }
                if (-1 !== smallestDelta) {
                    // removing the delta of previous events
                    for (let i = 0, j = trackParsers.length; i < j; i++) {
                        const curEvent = trackParsers[i].curEvent;
                        if (i !== smallestDelta && curEvent !== null) {
                            const smallestCurEvent = trackParsers[smallestDelta].curEvent;
                            if (smallestCurEvent === undefined || smallestCurEvent === null) {
                                throw new Error('Unexpected undefined event');
                            }
                            curEvent.delta -= smallestCurEvent.delta;
                        }
                    }
                    // filling values
                    const event = trackParsers[smallestDelta].curEvent;
                    if (event === undefined || event === null) {
                        throw new Error('Unexpected undefined event');
                    }
                    playTime += (event.delta ? (event.delta * tickResolution) / 1000 : 0);
                    if (event.type === MIDIEvents.EVENT_META) {
                        // tempo change events
                        if (event.subtype === MIDIEvents.EVENT_META_SET_TEMPO) {
                            tickResolution = this.header.getTickResolution(event.tempo);
                        }
                    }
                    // push midi events
                    if (((!type) || event.type === type) &&
                        ((!subtype) || (event.subtype && event.subtype === subtype))) {
                        event.playTime = playTime;
                        event.track = smallestDelta;
                        filteredEvents.push(event);
                    }
                    // getting next event
                    trackParsers[smallestDelta].curEvent = trackParsers[smallestDelta].parser.next();
                }
            } while (-1 !== smallestDelta);
        }
        return filteredEvents;
    };

    getMidiEvents() {
        return this.getEvents(MIDIEvents.EVENT_MIDI);
    };

    // Basic events reading
    getTrackEvents(index: number) {
        const events = [];
        if (index > this.tracks.length || 0 > index) {
            throw Error('Invalid track index (' + index + ')');
        }
        const parser = MIDIEvents.createParser(
            this.tracks[index].getTrackContent(), 0, false);
        let event = parser.next();
        do {
            events.push(event);
            event = parser.next();
        } while (event);
        return events;
    };

    // Basic events writting
    setTrackEvents(index: number, events: EventType[]) {

        if (index > this.tracks.length || 0 > index) {
            throw Error('Invalid track index (' + index + ')');
        }
        if ((!events) || (!events.length)) {
            throw Error('A track must contain at least one event, none given.');
        }
        const bufferLength = MIDIEvents.getRequiredBufferLength(events);
        const destination = new Uint8Array(bufferLength);
        MIDIEvents.writeToTrack(events, destination);
        this.tracks[index].setTrackContent(destination);
    };

    // Remove a track
    deleteTrack(index: number) {
        if (index > this.tracks.length || 0 > index) {
            throw Error('Invalid track index (' + index + ')');
        }
        this.tracks.splice(index, 1);
        this.header.setTracksCount(this.tracks.length);
    };

    // Add a track
    addTrack(index: number) {

        if (index > this.tracks.length || 0 > index) {
            throw Error('Invalid track index (' + index + ')');
        }
        const track = new MIDIFileTrack();
        if (index === this.tracks.length) {
            this.tracks.push(track);
        } else {
            this.tracks.splice(index, 0, track);
        }
        this.header.setTracksCount(this.tracks.length);
    };

    // Retrieve the content in a buffer
    getContent() {

        // Calculating the buffer content
        // - initialize with the header length
        let bufferLength = MIDIFileHeader.HEADER_LENGTH;
        // - add tracks length
        for (let i = 0, j = this.tracks.length; i < j; i++) {
            bufferLength += this.tracks[i].getTrackLength() + 8;
        }
        // Creating the destination buffer
        const destination = new Uint8Array(bufferLength);
        // Adding header
        let origin = new Uint8Array(this.header.datas.buffer,
            this.header.datas.byteOffset,
            MIDIFileHeader.HEADER_LENGTH);
        let i = 0;
        for (let j = MIDIFileHeader.HEADER_LENGTH; i < j; i++) {
            destination[i] = origin[i];
        }
        // Adding tracks
        for (let k = 0, l = this.tracks.length; k < l; k++) {
            origin = new Uint8Array(this.tracks[k].datas.buffer,
                this.tracks[k].datas.byteOffset,
                this.tracks[k].datas.byteLength);
            for (let m = 0, n = this.tracks[k].datas.byteLength; m < n; m++) {
                destination[i++] = origin[m];
            }
        }
        return destination.buffer;
    };

    // Exports Track/Header constructors
    static Header = MIDIFileHeader;
    static Track = MIDIFileTrack;
}
