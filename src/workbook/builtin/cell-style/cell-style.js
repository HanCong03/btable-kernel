/**
 * @file 定义内置单元格样式
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var NONE = require('NONE');

    module.exports = {
        "0": {
            "name": "常规",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "numfmts": {
                    "numfmt": "General"
                }
            }
        },
        "3": {
            "name": "千位分隔",
            "format": {
                "numfmts": {
                    "numfmt": "_ * #,##0.00_ ;_ * \\-#,##0.00_ ;_ * \"-\"??_ ;_ @_ "
                }
            }
        },
        "4": {
            "name": "货币",
            "format": {
                "numfmts": {
                    "numfmt": "_ \"¥\"* #,##0.00_ ;_ \"¥\"* \\-#,##0.00_ ;_ \"¥\"* \"-\"??_ ;_ @_ "
                }
            }
        },
        "5": {
            "name": "百分比",
            "format": {
                "numfmts": {
                    "numfmt": "0%"
                }
            }
        },
        "6": {
            "name": "千位分隔[0]",
            "format": {
                "numfmts": {
                    "numfmt": "_ * #,##0_ ;_ * \\-#,##0_ ;_ * \"-\"_ ;_ @_ "
                }
            }
        },
        "7": {
            "name": "货币[0]",
            "format": {
                "numfmts": {
                    "numfmt": "_ \"¥\"* #,##0_ ;_ \"¥\"* \\-#,##0_ ;_ \"¥\"* \"-\"_ ;_ @_ "
                }
            }
        },
        "8": {
            "name": "超链接",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 10,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false,
                    "underline": "single"
                }
            }
        },
        "10": {
            "name": "注释",
            "format": {
                "fills": {
                    "fill": {
                        "value": "#FFFFCC"
                    }
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "thin",
                            "color": {
                                "value": "#B2B2B2"
                            }
                        },
                        "right": {
                            "style": "thin",
                            "color": {
                                "value": "#B2B2B2"
                            }
                        },
                        "left": {
                            "style": "thin",
                            "color": {
                                "value": "#B2B2B2"
                            }
                        },
                        "bottom": {
                            "style": "thin",
                            "color": {
                                "value": "#B2B2B2"
                            }
                        }
                    }
                }
            }
        },
        "11": {
            "name": "警告文本",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#FF0000"
                    },
                    "bold": false,
                    "italic": false
                }
            }
        },
        "15": {
            "name": "标题",
            "format": {
                "fonts": {
                    "name": {
                        "type": "major"
                    },
                    "size": 18,
                    "color": {
                        "theme": 3,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                }
            }
        },
        "16": {
            "name": "标题 1",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 15,
                    "color": {
                        "theme": 3,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                },
                "borders": {
                    "border": {
                        "top": null,
                        "right": null,
                        "left": null,
                        "bottom": {
                            "style": "thick",
                            "color": {
                                "theme": 4,
                                "tint": 0
                            }
                        }
                    }
                }
            }
        },
        "17": {
            "name": "标题 2",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 13,
                    "color": {
                        "theme": 3,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                },
                "borders": {
                    "border": {
                        "top": null,
                        "right": null,
                        "left": null,
                        "bottom": {
                            "style": "thick",
                            "color": {
                                "theme": 4,
                                "tint": 0.499984740745262
                            }
                        }
                    }
                }
            }
        },
        "18": {
            "name": "标题 3",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 3,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                },
                "borders": {
                    "border": {
                        "top": null,
                        "right": null,
                        "left": null,
                        "bottom": {
                            "style": "medium",
                            "color": {
                                "theme": 4,
                                "tint": 0.3999755851924192
                            }
                        }
                    }
                }
            }
        },
        "19": {
            "name": "标题 4",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 3,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                }
            }
        },
        "20": {
            "name": "输入",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#3F3F76"
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#FFCC99"
                    }
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "right": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "left": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "bottom": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        }
                    }
                }
            }
        },
        "21": {
            "name": "输出",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#3F3F3F"
                    },
                    "bold": true,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#F2F2F2"
                    }
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "thin",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "right": {
                            "style": "thin",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "left": {
                            "style": "thin",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "bottom": {
                            "style": "thin",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        }
                    }
                }
            }
        },
        "22": {
            "name": "计算",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#FA7D00"
                    },
                    "bold": true,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#F2F2F2"
                    }
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "right": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "left": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        },
                        "bottom": {
                            "style": "thin",
                            "color": {
                                "value": "#7F7F7F"
                            }
                        }
                    }
                }
            }
        },
        "23": {
            "name": "检查单元格",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#A5A5A5"
                    }
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "double",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "right": {
                            "style": "double",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "left": {
                            "style": "double",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        },
                        "bottom": {
                            "style": "double",
                            "color": {
                                "value": "#3F3F3F"
                            }
                        }
                    }
                }
            }
        },
        "24": {
            "name": "链接单元格",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#FA7D00"
                    },
                    "bold": false,
                    "italic": false
                },
                "borders": {
                    "border": {
                        "top": null,
                        "right": null,
                        "left": null,
                        "bottom": {
                            "style": "double",
                            "color": {
                                "value": "#FF8001"
                            }
                        }
                    }
                }
            }
        },
        "25": {
            "name": "汇总",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": true,
                    "italic": false
                },
                "borders": {
                    "border": {
                        "top": {
                            "style": "thin",
                            "color": {
                                "theme": 4,
                                "tint": 0
                            }
                        },
                        "right": null,
                        "left": null,
                        "bottom": {
                            "style": "double",
                            "color": {
                                "theme": 4,
                                "tint": 0
                            }
                        }
                    }
                }
            }
        },
        "26": {
            "name": "好",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#006100"
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#C6EFCE"
                    }
                }
            }
        },
        "27": {
            "name": "差",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#9C0006"
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#FFC7CE"
                    }
                }
            }
        },
        "28": {
            "name": "适中",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#9C6500"
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "value": "#FFEB9C"
                    }
                }
            }
        },
        "29": {
            "name": "着色 1",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 4,
                        "tint": 0
                    }
                }
            }
        },
        "30": {
            "name": "20% - 着色 1",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 4,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "31": {
            "name": "40% - 着色 1",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 4,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "32": {
            "name": "60% - 着色 1",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 4,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "33": {
            "name": "着色 2",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 5,
                        "tint": 0
                    }
                }
            }
        },
        "34": {
            "name": "20% - 着色 2",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 5,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "35": {
            "name": "40% - 着色 2",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 5,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "36": {
            "name": "60% - 着色 2",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 5,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "37": {
            "name": "着色 3",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 6,
                        "tint": 0
                    }
                }
            }
        },
        "38": {
            "name": "20% - 着色 3",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 6,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "39": {
            "name": "40% - 着色 3",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 6,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "40": {
            "name": "60% - 着色 3",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 6,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "41": {
            "name": "着色 4",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 7,
                        "tint": 0
                    }
                }
            }
        },
        "42": {
            "name": "20% - 着色 4",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 7,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "43": {
            "name": "40% - 着色 4",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 7,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "44": {
            "name": "60% - 着色 4",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 7,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "45": {
            "name": "着色 5",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 8,
                        "tint": 0
                    }
                }
            }
        },
        "46": {
            "name": "20% - 着色 5",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 8,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "47": {
            "name": "40% - 着色 5",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 8,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "48": {
            "name": "60% - 着色 5",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 8,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "49": {
            "name": "着色 6",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 9,
                        "tint": 0
                    }
                }
            }
        },
        "50": {
            "name": "20% - 着色 6",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 9,
                        "tint": 0.7999816888943144
                    }
                }
            }
        },
        "51": {
            "name": "40% - 着色 6",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 1,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 9,
                        "tint": 0.5999938962981048
                    }
                }
            }
        },
        "52": {
            "name": "60% - 着色 6",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "theme": 0,
                        "tint": 0
                    },
                    "bold": false,
                    "italic": false
                },
                "fills": {
                    "fill": {
                        "theme": 9,
                        "tint": 0.3999755851924192
                    }
                }
            }
        },
        "53": {
            "name": "解释性文本",
            "format": {
                "fonts": {
                    "name": {
                        "type": "minor"
                    },
                    "size": 11,
                    "color": {
                        "value": "#7F7F7F"
                    },
                    "bold": false,
                    "italic": true
                }
            }
        }
    };
});