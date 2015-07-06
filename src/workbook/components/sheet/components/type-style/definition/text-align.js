/**
 * @file 类型对齐
 * @author hancong03@baiud.com
 */

/*
 NUMBER: 'n',
 NUMBER_STRING: 'ns',
 CURRENCY: 'c',
 ACCOUNTANT: 'a',
 TIME: 't',
 DATETIME: 'dt',
 PERCENTAGE: 'p',
 FRACTION: 'f',
 SCIENTIFIC: 'sc',
 TEXT: 's',
 LOGICAL: 'l',
 ERROR: 'e'
 */
define({
    ltr: {
        n: 'right',
        ns: 'right',
        c: 'right',
        a: 'right',
        t: 'right',
        dt: 'right',
        p: 'right',
        f: 'left',
        sc: 'right',
        s: 'left',
        l: 'center',
        e: 'center'
    },

    rtl: {
        n: 'left',
        ns: 'left',
        c: 'left',
        a: 'left',
        t: 'left',
        dt: 'left',
        p: 'left',
        f: 'right',
        sc: 'left',
        s: 'right',
        l: 'center',
        e: 'center'
    }
});