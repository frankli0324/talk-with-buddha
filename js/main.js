// JavaScript Document

$("#error-alert").hide();
$("#copy-alert").hide();

const map = [
    '怎么会这样？',
    '不是这样子的，',
    '你得先这样，',
    '然后再这样，',
    '最后再这样，',
    '听明白没有？',
    '很简单么对不对',
    '你听我说',
];

function decode(str) {
    let indexes = new Array();
    let buf = new Array();
    while (str.length) {
        match: {
            for (let i in map) {
                if (str.startsWith(map[i])) {
                    indexes.push(Number(i));
                    str = str.slice(map[i].length)
                    break match;
                }
            }
            throw new Error('decode error');
        }
    }
    for (let i = 0; i < indexes.length; i += 3) {
        buf.push(indexes[i + 0] * 64 + indexes[i + 1] * 8 + indexes[i + 2]);
    }
    return new TextDecoder().decode(Uint8Array.from(buf));
}

function encode(str) {
    let arr = new TextEncoder().encode(str);
    let indexes = new Array();
    for (let c of arr) {
        let s = c.toString(8);
        for (let n of s.padStart(3, '0'))
            indexes.push(Number.parseInt(n));
    }
    return indexes.map((i) => map[i]).join('')
}

function encrypt() {
	var msg = $("#text-decryped").val();
	var key = $("#text-key").val();

	if (msg.length < 1) {
		$("#error-alert").show();
		$("#copy-alert").hide();
		$("#error-alert").text("让你的甲方能顺利听懂你的话。（请输入待编码的明文）");
	} else {
		$("#text-encryped").val(encode(msg));
		$("#error-alert").hide();
		$("#copy-alert").hide();
	}

}

function decrypt() {
	var msg = $("#text-decryped").val();
	var key = $("#text-key").val();

	if (msg.length < 1) {
		$("#error-alert").show();
		$("#copy-alert").hide();
		$("#error-alert").text("让你顺利听懂你的甲方说的话（请输入待解密的密文）");
	} else {
		try {
			$("#error-alert").hide();
			var str = decode(msg);
		} catch (err) {
			$("#error-alert").show();
			$("#copy-alert").hide();
			$("#error-alert").text("我也听不懂呢~");
		} finally {
			$("#text-encryped").val(str);
		}
	}

}
