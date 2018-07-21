//import Blockly from 'node-blockly/browser';
//import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';

//images
import happy from '../../img/emotions/happy.jpg';
import sad from '../../img/emotions/sad.jpg';
import fear from '../../img/emotions/fear.jpg';
import surprise from '../../img/emotions/surprise.jpg';
import anger from '../../img/emotions/anger.jpg';
import disgust from '../../img/emotions/disgust.jpg';



//LED/////////////////////////////
const led = {
    name: 'led',
    category: 'LED',
    block: {
        init: function () {
            this.jsonInit({
                "type": "block_type",
                "message0": "Flash interval %1",
                "args0": [
                  {
                    "type": "field_number",
                    "name": "FLASH_SPEED",
                    "value": 1000,
                    "min": 100,
                    "max": 10000
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "Makes the onboard LED blink",
                "helpUrl": ""
              });
            },
        },
        generator: (block) => {
            var number_flash_speed = block.getFieldValue('FLASH_SPEED');
            var code = 'var toggle=1;setInterval(function() {toggle=!toggle;digitalWrite(D2, toggle);},'+number_flash_speed+');\n';
            return code;
        },
};

const clearInterval = {
    name: 'clearInterval',
    category: 'LED',
    block: {
        init: function () {
            this.jsonInit({
                "type": "block_type",
                "message0": "Clear interval",
                "colour": 230,
                "tooltip": "Clears the interval for the blinking LED block",
                "helpUrl": ""
              });
            },
        },
        generator: (block) => {
            var code = 'clearInterval();\n';
            return code;
        },
};

//MOVEMENT////////////////////////////////
/*const rotate = {
    name: 'rotate',
    category: 'Movement',
    block: {
        init: function () {
            this.jsonInit({
                "type": "rotate",
                "message0": "rotate %1",
                "args0": [
                    {
                        "type": "field_angle",
                        "name": "DEGREES",
                        "angle": 90
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 180,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    },
    generator: (block) => {
        const degrees = `'${block.getFieldValue('DEGREES')}'` || '\'\'';
        const code = 'rotate(' + degrees + ');\n';
        return code;
    },
};*/

const move = {
    name: 'move',
    category: 'Movement',
    block: {
        init: function () {
            this.jsonInit({
                "type": "move",
                "message0": "Direction %1 Steps %2",
                "args0": [
                    {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        [
                        "forward",
                        "forward"
                        ],
                        [
                        "backward",
                        "backward"
                        ]
                    ]},
                    {
                    "type": "field_number",
                    "name": "steps",
                    "value": 1000,
                    "min": 100,
                    "max": 10000
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 180,
                "tooltip": "Move the robot forward or backward",
                "helpUrl": ""
            });
        },
    },
    generator: (block) => {
        var dropdown_direction = block.getFieldValue('direction');
        var number_steps = block.getFieldValue('steps');
        // TODO: Assemble JavaScript into code variable.
        var code = 'move("' + dropdown_direction + '",' + number_steps + ');\n';
        return code;
    },
};

const turn = {
    name: 'turn',
    category: 'Movement',
    block: {
        init: function () {
            this.jsonInit({
                "type": "turn",
                "message0": "Direction %1 Degree %2",
                "args0": [
                    {
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        [
                        "Right",
                        "turnRight"
                        ],
                        [
                        "Left",
                        "turnLeft"
                        ]
                    ]
                    },
                    {
                    "type": "field_angle",
                    "name": "DEGREES",
                    "angle": 90
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 180,
                "tooltip": "Make the robot turn",
                "helpUrl": ""
            });
        },
    },
    generator: (block) => {
        var dropdown_direction = block.getFieldValue('DIRECTION');
        var angle_degrees = block.getFieldValue('DEGREES');
        //const direction = `'${block.getFieldValue('DIRECTION')}'` || '\'\'';
        const code = 'turn("' + dropdown_direction + '","' + angle_degrees + '");\n';
        return code;
    },
};

//EMOTIONS/////////////////////
const face = {
    name: 'face',
    category: 'Emotions',
    block: {
        init: function () {
            this.jsonInit({
                "type": "face",
                "message0": "set_face_to %1 %2",
                "args0": [
                  {
                    "type": "input_dummy"
                  },
                  {
                    "type": "field_dropdown",
                    "name": "EMOTION",
                    "options": [
                      [
                                {
                                    "src": happy,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "happy"
                                },
                                "HAPPY"
                            ],
                            [
                                {
                                    "src": sad,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "sad"
                                },
                                "SAD"
                            ],
                            [
                                {
                                    "src": fear,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "fear"
                                },
                                "FEAR"
                            ],
                            [
                                {
                                    "src": surprise,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "surprise"
                                },
                                "SURPRISE"
                            ],
                            [
                                {
                                    "src": anger,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "anger"
                                },
                                "ANGER"
                            ],
                            [
                                {
                                    "src": disgust,
                                    "width": 40,
                                    "height": 40,
                                    "alt": "disgust"
                                },
                                "DISGUST"
                            ]
                        ]
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 345,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    },
    generator: (block) => {
        var dropdown_emotion = block.getFieldValue('EMOTION');
        var code = '...;\n';
        return code;
    },

};

const draw_face = {
    name: 'draw_face',
    category: 'Emotions',
    block: {
        init: function () {
            this.jsonInit({
                "type": "draw_face",
                "message0": "draw face %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72",
                "args0": [
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "11",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "12",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "13",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "14",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "15",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "16",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "17",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "18",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "21",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "22",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "23",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "24",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "25",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "26",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "27",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "28",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "31",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "32",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "33",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "34",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "35",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "36",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "37",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "38",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "41",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "42",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "43",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "44",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "45",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "46",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "47",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "48",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "51",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "52",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "53",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "54",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "55",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "56",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "57",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "58",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "61",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "62",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "63",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "64",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "65",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "66",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "67",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "68",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "71",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "72",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "73",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "74",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "75",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "76",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "77",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "78",
                        "checked": false
                    },
                    {
                        "type": "input_dummy"
                    },
                    {
                        "type": "field_checkbox",
                        "name": "81",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "82",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "83",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "84",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "85",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "86",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "87",
                        "checked": false
                    },
                    {
                        "type": "field_checkbox",
                        "name": "88",
                        "checked": false
                    }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 345,
                "tooltip": "",
                "helpUrl": ""
            });
        },
    },
    generator: (block) => {
        /*
        var checkbox_11 = block.getFieldValue('11') == 'TRUE';
        var checkbox_12 = block.getFieldValue('12') == 'TRUE';
        var checkbox_13 = block.getFieldValue('13') == 'TRUE';
        var checkbox_14 = block.getFieldValue('14') == 'TRUE';
        var checkbox_15 = block.getFieldValue('15') == 'TRUE';
        var checkbox_16 = block.getFieldValue('16') == 'TRUE';
        var checkbox_17 = block.getFieldValue('17') == 'TRUE';
        var checkbox_18 = block.getFieldValue('18') == 'TRUE';
        var checkbox_21 = block.getFieldValue('21') == 'TRUE';
        var checkbox_22 = block.getFieldValue('22') == 'TRUE';
        var checkbox_23 = block.getFieldValue('23') == 'TRUE';
        var checkbox_24 = block.getFieldValue('24') == 'TRUE';
        var checkbox_25 = block.getFieldValue('25') == 'TRUE';
        var checkbox_26 = block.getFieldValue('26') == 'TRUE';
        var checkbox_27 = block.getFieldValue('27') == 'TRUE';
        var checkbox_28 = block.getFieldValue('28') == 'TRUE';
        var checkbox_31 = block.getFieldValue('31') == 'TRUE';
        var checkbox_32 = block.getFieldValue('32') == 'TRUE';
        var checkbox_33 = block.getFieldValue('33') == 'TRUE';
        var checkbox_34 = block.getFieldValue('34') == 'TRUE';
        var checkbox_35 = block.getFieldValue('35') == 'TRUE';
        var checkbox_36 = block.getFieldValue('36') == 'TRUE';
        var checkbox_37 = block.getFieldValue('37') == 'TRUE';
        var checkbox_38 = block.getFieldValue('38') == 'TRUE';
        var checkbox_41 = block.getFieldValue('41') == 'TRUE';
        var checkbox_42 = block.getFieldValue('42') == 'TRUE';
        var checkbox_43 = block.getFieldValue('43') == 'TRUE';
        var checkbox_44 = block.getFieldValue('44') == 'TRUE';
        var checkbox_45 = block.getFieldValue('45') == 'TRUE';
        var checkbox_46 = block.getFieldValue('46') == 'TRUE';
        var checkbox_47 = block.getFieldValue('47') == 'TRUE';
        var checkbox_48 = block.getFieldValue('48') == 'TRUE';
        var checkbox_51 = block.getFieldValue('51') == 'TRUE';
        var checkbox_52 = block.getFieldValue('52') == 'TRUE';
        var checkbox_53 = block.getFieldValue('53') == 'TRUE';
        var checkbox_54 = block.getFieldValue('54') == 'TRUE';
        var checkbox_55 = block.getFieldValue('55') == 'TRUE';
        var checkbox_56 = block.getFieldValue('56') == 'TRUE';
        var checkbox_57 = block.getFieldValue('57') == 'TRUE';
        var checkbox_58 = block.getFieldValue('58') == 'TRUE';
        var checkbox_61 = block.getFieldValue('61') == 'TRUE';
        var checkbox_62 = block.getFieldValue('62') == 'TRUE';
        var checkbox_63 = block.getFieldValue('63') == 'TRUE';
        var checkbox_64 = block.getFieldValue('64') == 'TRUE';
        var checkbox_65 = block.getFieldValue('65') == 'TRUE';
        var checkbox_66 = block.getFieldValue('66') == 'TRUE';
        var checkbox_67 = block.getFieldValue('67') == 'TRUE';
        var checkbox_68 = block.getFieldValue('68') == 'TRUE';
        var checkbox_71 = block.getFieldValue('71') == 'TRUE';
        var checkbox_72 = block.getFieldValue('72') == 'TRUE';
        var checkbox_73 = block.getFieldValue('73') == 'TRUE';
        var checkbox_74 = block.getFieldValue('74') == 'TRUE';
        var checkbox_75 = block.getFieldValue('75') == 'TRUE';
        var checkbox_76 = block.getFieldValue('76') == 'TRUE';
        var checkbox_77 = block.getFieldValue('77') == 'TRUE';
        var checkbox_78 = block.getFieldValue('78') == 'TRUE';
        var checkbox_81 = block.getFieldValue('81') == 'TRUE';
        var checkbox_82 = block.getFieldValue('82') == 'TRUE';
        var checkbox_83 = block.getFieldValue('83') == 'TRUE';
        var checkbox_84 = block.getFieldValue('84') == 'TRUE';
        var checkbox_85 = block.getFieldValue('85') == 'TRUE';
        var checkbox_86 = block.getFieldValue('86') == 'TRUE';
        var checkbox_87 = block.getFieldValue('87') == 'TRUE';
        var checkbox_88 = block.getFieldValue('88') == 'TRUE';
        */
        var code = '...;\n';
        return code;
    },
};



//Put all the variables from block into an array and export it.
//That way, we can use the variables in other files like BlocklyEditor.
let blocks = {  turn, face, draw_face, led, move, clearInterval };

export { blocks }
