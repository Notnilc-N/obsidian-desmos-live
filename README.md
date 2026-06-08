made with claude.

to use it, go to desmos, press f12 or ctrl+shift+i to open inspector, click the console tab up the top, then type Calc.getState(), right click output, copy as object, then past into a code block that uses the desmos-live modifier. E.g.
```desmos-live
{
    "version": 11,
    "randomSeed": "2f487e7cd41475677bd0a2bf608a0649",
    "graph": {
        "viewport": {
            "xmin": -4.294951654263147,
            "ymin": -2.1584378047891963,
            "xmax": 5.971294418906662,
            "ymax": 4.334629516813008
        },
        "__v12ViewportLatexStash": {
            "xmin": "-4.294951654263147",
            "xmax": "5.971294418906662",
            "ymin": "-2.1584378047891963",
            "ymax": "4.334629516813008"
        }
    },
    "expressions": {
        "list": [
            {
                "type": "expression",
                "id": "5",
                "color": "#000000",
                "latex": "X=-0.6"
            },
            {
                "type": "expression",
                "id": "1",
                "color": "#c74440",
                "latex": "F\\left(x\\right)=\\cos\\left(x\\right)"
            },
            {
                "type": "expression",
                "id": "4",
                "color": "#6042a6",
                "latex": "F'\\left(X\\right)x+C"
            },
            {
                "type": "expression",
                "id": "6",
                "color": "#c74440",
                "latex": "C=F\\left(X\\right)-F'\\left(X\\right)X"
            },
            {
                "type": "expression",
                "id": "7",
                "color": "#c74440",
                "latex": "f\\left(x\\right)=\\frac{F\\left(x+h\\right)-F\\left(x\\right)}{h}",
                "hidden": true
            },
            {
                "type": "expression",
                "id": "8",
                "color": "#2d70b3",
                "latex": "h=-0.076",
                "slider": {
                    "hardMin": true,
                    "hardMax": true,
                    "min": "-0.1",
                    "max": "0.1"
                }
            },
            {
                "type": "expression",
                "id": "9",
                "color": "#388c46",
                "latex": "f\\left(X\\right)x+c"
            },
            {
                "type": "expression",
                "id": "11",
                "color": "#000000",
                "latex": "c=F\\left(X\\right)-f\\left(X\\right)X",
                "hidden": true
            },
            {
                "type": "expression",
                "id": "12",
                "color": "#c74440"
            }
        ]
    },
    "includeFunctionParametersInRandomSeed": true,
    "doNotMigrateMovablePointStyle": true
}
```

You can change the height in the plugin settings.
