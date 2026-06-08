made with claude.

to use it, go to desmos, press f12 or ctrl+shift+i to open inspector, click the console tab up the top, then type Calc.getState(), right click output, copy as object, then paste into a code block that uses the desmos-live modifier. You can change the height in the plugin settings.
E.g.
```
```desmos-live
{
    "version": 11,
    "randomSeed": "2f487e7cd41475677bd0a2bf608a0649",
    "graph": {
        "viewport": {
            "xmin": -4.674936086841508,
            "ymin": -2.1384386241271773,
            "xmax": 5.591309986328301,
            "ymax": 4.354628697475027
        },
        "degreeMode": true,
        "__v12ViewportLatexStash": {
            "xmin": "-4.674936086841508",
            "xmax": "5.591309986328301",
            "ymin": "-2.1384386241271773",
            "ymax": "4.354628697475027"
        }
    },
    "expressions": {
        "list": [
            {
                "type": "expression",
                "id": "5",
                "color": "#000000",
                "latex": "X=0"
            },
            {
                "type": "expression",
                "id": "1",
                "color": "#c74440",
                "latex": "F\\left(x\\right)=e^{x}"
            },
            {
                "type": "expression",
                "id": "15",
                "color": "#2d70b3",
                "latex": "F'\\left(x\\right)",
                "lineStyle": "DOTTED"
            },
            {
                "type": "expression",
                "id": "14",
                "color": "#2d70b3",
                "latex": "F\\left(X\\right)"
            },
            {
                "type": "expression",
                "id": "13",
                "color": "#c74440",
                "latex": "F'\\left(X\\right)"
            },
            {
                "type": "expression",
                "id": "16",
                "color": "#000000",
                "latex": "x=X\\left\\{F\\left(X\\right)-0.5\\le y\\le F\\left(X\\right)+0.5\\right\\}",
                "lineStyle": "DASHED"
            },
            {
                "type": "expression",
                "id": "18",
                "color": "#000000",
                "latex": "y=F\\left(X\\right)\\left\\{X-0.5\\le x\\le X+0.5\\right\\}",
                "lineStyle": "DASHED"
            },
            {
                "type": "expression",
                "id": "6",
                "color": "#c74440",
                "latex": "C=F\\left(X\\right)-F'\\left(X\\right)X"
            },
            {
                "type": "expression",
                "id": "4",
                "color": "#6042a6",
                "latex": "F'\\left(X\\right)x+C"
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
                "latex": "h=-0.057",
                "slider": {
                    "hardMin": true,
                    "hardMax": true,
                    "min": "-0.1",
                    "max": "0.1"
                }
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
                "id": "9",
                "color": "#388c46",
                "latex": "f\\left(X\\right)x+c",
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
```
