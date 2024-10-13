class GVar {
    constructor() {}
}
class DevCfg {
    constructor() {}
}
const magicNumber_Profile = "incott_magic100";
class StProfile {
    constructor(name, d) {
        //this.magic = magicNumber_Profile;
        this.inside = false;  //是否是内置的，若为true则不允许将该配置文件从lstPro数组中删除
        this.name = name;
        this.uid = Date.now();  //配置文件id
        this.reset(d);
    }
    reset(d){
        if(undefined==d || null==d) return;
        //this.key = d.key.concat();//_20e0pnfczxl5(d.key);
        this.key = new Array();
        for(let i=0; i<d.key.length; i++){
            this.key[i] = d.key[i].copy();
        }
        this.dpicolor = d.dpicolor.concat();
        //this.dpiuinum = d.dpi.length;   //去掉，直接用d.dpi.length就行
        this.dpi = d.dpi.concat();  //数组是对象，若只是 this.dpi = d.dpi 这样赋值，修改this.dpi的值时会同时影响d.dpi
        this.dpiy = d.dpi.concat();  //Y轴DPI
        
        this.usbrate = 500;
        this.lod = 1;         //0=0.7mm，1=1mm，2=2mm
        this.sensormode = 1;  //默认标准模式（0=节能模式，1=标准模式，2=竞技模式）

        this.fixline = false;
        this.ripple = false;
        this.motion = true;
        this.debounce = 8;
        this.sleeptime=60;  //默认60秒
        this.receiverLED=0;  //8K接收器灯光模式，0=连接状态和回报率，1=电池状态，2=仅电池警告
    }
    copy(){   //返回自身的一个拷贝对象
        let t = new StProfile(this.name, null);
        t.uid = Date.now();   //新分配一个配置文件id
        t.inside = this.inside;
        t.key = new Array();
        for(let i=0; i<this.key.length; i++) t.key[i]=this.key[i].copy();
        t.dpicolor = this.dpicolor.concat();
        t.dpi = this.dpi.concat();  //数组是对象，若只是 t.dpi = p.dpi 这样赋值，修改t.dpi的值时会同时影响p.dpi
        t.dpiy = this.dpiy.concat();
        t.usbrate = this.usbrate;
        t.lod = this.lod;         //0=0.7mm，1=1mm，2=2mm
        t.sensormode = this.sensormode;  //默认标准模式（0=节能模式，1=标准模式，2=竞技模式）
        t.fixline = this.fixline;
        t.ripple = this.ripple;
        t.motion = this.motion;
        t.debounce = this.debounce;
        t.sleeptime = this.sleeptime;
        t.receiverLED = this.receiverLED;
        return t;
    }
    toText(){
        let str="";
        str += `magic:${magicNumber_Profile};`;
        str += `name:${this.name};`;
        str += `inside:${this.inside};`;
        str += `uid:${this.uid};`;

        str += `usbrate:${this.usbrate};`;
        str += `lod:${this.lod};`;
        str += `sensormode:${this.sensormode};`;
        str += `fixline:${this.fixline};`;
        str += `ripple:${this.ripple};`;
        str += `motion:${this.motion};`;
        str += `debounce:${this.debounce};`;
        str += `sleeptime:${this.sleeptime};`;
        str += `receiverLED:${this.receiverLED};`;

        str += `dpiuinum:${this.dpi.length};`;
        for(let i=0; i<this.dpi.length; i++){
            str += `dpi[${i}]:${this.dpi[i]};`;
        }
        for(let i=0; i<this.dpi.length; i++){
            str += `dpiy[${i}]:${this.dpiy[i]};`;
        }
        for(let i=0; i<this.dpicolor.length; i++){
            str += `dpicolor[${i}]:${this.dpicolor[i]};`;
        }
        for(let i=0; i<this.key.length; i++){
            str += `key[${i}]:${this.key[i].toText()};`;
        }
        str.split()
        return str;
    }
    initByText(str){
        this.reset(dvar);  //先复位
        let s;
        s = _oianz8zctl0t(str,"magic");
        if(null==s) return false;   //未找到魔数值
        if(s!=magicNumber_Profile){ console.log("initByText: magic unmatch!"); return false; }  //魔数值不匹配
        
        if(null!=(s=_oianz8zctl0t(str,"name"))) this.name=s;
        if(null!=(s=_q5rubgsnv8oh(str,"inside"))) this.inside=s;
        if(null!=(s=_oianz8zctl0t(str,"uid"))) this.uid=s;

        if(null!=(s=_q5rubgsnv8oh(str,"fixline"))) this.fixline=s;
        if(null!=(s=_q5rubgsnv8oh(str,"ripple"))) this.ripple=s;
        if(null!=(s=_q5rubgsnv8oh(str,"motion"))) this.motion=s;

        if(null!=(s=_kdmisuou7l37(str,"usbrate"))) this.usbrate=s;
        if(null!=(s=_kdmisuou7l37(str,"lod"))) this.lod=s;
        if(null!=(s=_kdmisuou7l37(str,"sensormode"))) this.sensormode=s;

        if(null!=(s=_kdmisuou7l37(str,"debounce"))) this.debounce=s;
        if(null!=(s=_kdmisuou7l37(str,"sleeptime"))) this.sleeptime=s;
        if(null!=(s=_kdmisuou7l37(str,"receiverLED"))) this.receiverLED=s;

        let dpiNum=0;
        if(null!=(s=_kdmisuou7l37(str,"dpiuinum"))){
            dpiNum = _xyj70n44lvui(s);
            if(dpiNum>dvar.dpi.length) dpiNum=dvar.dpi.length;
            for(let i=0; i<dpiNum; i++){
                if(null!=(s=_kdmisuou7l37(str,`dpi[${i}]`))) this.dpi[i]=s;
                if(null!=(s=_kdmisuou7l37(str,`dpicolor[${i}]`))) this.dpicolor[i]=s;
                if(null!=(s=_kdmisuou7l37(str,`dpiy[${i}]`))){
                    this.dpiy[i] = s;
                }else{
                    this.dpiy[i] = this.dpi[i];
                }
            }
            this.dpi.length = dpiNum;   //上面执行reset()的时候dpi数组的长度复位成了默认长度，这里根据实际修改
            this.dpiy.length = this.dpi.length;  //确保X Y轴的挡位数量是一样的
            this.dpicolor.length = dpiNum;
        } 
        
        for(let i=0; i<this.key.length; i++){
            s = _oianz8zctl0t(str,`key[${i}]`);
            if(null!=s){
                let arr = s.split(',');
                if(5==arr.length){
                    this.key[i].major = _xyj70n44lvui(arr[0]);
                    this.key[i].minor = _xyj70n44lvui(arr[1]);
                    this.key[i].modifer = _xyj70n44lvui(arr[2]);
                    this.key[i].macro = _xyj70n44lvui(arr[3]);
                    this.key[i].itemdata = _xyj70n44lvui(arr[4]);
                }
            }
        }
        return true;
    }
}
class StProfileList {  //对应一个配置文件链表
    constructor() { this.list = new Array(); }
    addProfile(t){  //新增配置，参数是一个StProfile对象
        if(!(t instanceof StProfile)) return;
        this.list.push(t);   
    }
    profileToIndex(t){ this.list.indexOf(t); }  //返回t在数组中的序号，若找不到则返回-1
    profileIdToIndex(uid){  //跟据配置文件id，返回配置文件在数组中的序号，若找不到则返回-1
        let t = this.findProfile(uid);
        if(null==t) return -1;
        return this.list.indexOf(t); 
    }
    delProfile(uid){  //删除指定配置文件id的节点
        let index = this.profileIdToIndex(uid);
        if(-1==index) return;
        if(true==this.list[index].inside) return;   //内置配置不允许删除
        this.list.splice(index, 1); 
    }
    clearProfile(){ this.list.length=0; }  //清空配置文件
    findProfile(uid){   //根据配置id返回对应的配置文件
        for(let i=0; i<this.list.length; i++){ if(this.list[i].uid==uid) return this.list[i]; }
        return null;
    }
    toText(){
        let str="";
        for(let i=0; i<this.list.length; i++){
            if(0!=i) str+="|||";   //配置之间的分隔符
            str += this.list[i].toText();
        }
        return str;
    }
    initByText(str){
        this.clearProfile();
        let arr = str.split('|||');
        for(let i=0; i<arr.length; i++){
            let t = new StProfile('', null);
            if( t.initByText(arr[i]) ) this.list.push(t);  //解析成功才加入数组
        }
    }
}
var lstPro = new StProfileList();
var curProIndex=0;
function _nci91wo0vpg0(){ return curProIndex; }
function _o6o0mnaqjjd6(index){ curProIndex=index; return index; }
function _6xi60jk4gotr(){
    if(curProIndex<0 || curProIndex>=lstPro.list.length) return null;
    return lstPro.list[curProIndex];
}
function _gxoyqd56f6zh(){ localStorage.setItem("profile", lstPro.toText()); }
function _hkqt9qvut1r4(){
    let str = localStorage.getItem("profile");
    if(null==str || str.length<=0) return 0;
    lstPro.initByText(str);
    return lstPro.list.length;
}


function _s2djxpxmizuk(str, key){
    let s=_oianz8zctl0t(str,key);
    if(null==s) return;
}
function _kdmisuou7l37(str, key){
    return _xyj70n44lvui( _oianz8zctl0t(str,key) );
}
function _q5rubgsnv8oh(str, key){
    let s=_oianz8zctl0t(str,key);
    if(null!=s){
        if('true'==s) return true;
        if('false'==s) return false;
    }
    return null;
}
function _oianz8zctl0t(str, key){
    if(null==str || null==key || ''==key) return null;
    let start = str.indexOf(key+":");
    if(-1==start) return null;
    start += key.length+1;
    let end = str.indexOf(";", start);
    if(-1==end) return null;
    return str.slice(start, end)
}
class KeyInfo {
    constructor(major, minor) {
        this.major = major;
        this.minor = minor;
        this.modifer = 0;  //功能为键盘按键时，该属性存放modify，minor存放键码，取值 mdfCtrlL/mdfShiftL/mdfAltL/mdfWinL
        this.macro = 0;
        this.itemdata=0;  //功能为火力键时，byte0是开火次数，byte1是开火间隔
        this.matrix=-1;      //按键在硬件矩阵中的位置
        this.hide = false;  //该键是否隐藏，不显示在界面上
    }
    copy(){
        let obj = new KeyInfo(this.major, this.minor);
        obj.modifer = this.modifer;
        obj.macro = this.macro;
        obj.itemdata = this.itemdata;
        obj.matrix = this.matrix;
        return obj;
    }
    toText(){
        let str=`${this.major},${this.minor},${this.modifer},${this.macro},${this.itemdata}`;
        return str;
    }
}
class FilterText
{
    constructor(type){ 
        this.type = type;
        this.result = false;
        this.outfilter=null;
    }
    filter(str){
        if(typeof this.outfilter=="function") return this.outfilter(this, str);
        let temp="";
        for(let i=0; i<str.length; i++){
            let c = str.charCodeAt(i);
            if( ((this.type&1) && c>="0".charCodeAt(0) && c<="9".charCodeAt(0)) ||
                ((this.type&2) && ( (c>="a".charCodeAt(0) && c<="z".charCodeAt(0)) || (c>="A".charCodeAt(0) && c<="Z".charCodeAt(0)) ) )
            ){
                temp += str.charAt(i);
            }else{
                this.result=true;
            }
        }
        if(undefined!=this.min){
            let val = _xyj70n44lvui(temp);
            if(val<this.min){
                this.result=true;
                temp=this.min.toString();
            } 
        }
        if(undefined!=this.max){
            let val = _xyj70n44lvui(temp);
            if(val>this.max){
                this.result=true;
                temp=this.max.toString();
            } 
        }
        return temp;
    }
};
function _f02hltnsi43c(){
    let num=0;
    for(let i=0; i<dvar.key.length; i++){
        if(!dvar.key[i].hide) num++;
    }
    return num;
};

class Language {
    constructor() {}
}
const apReset=1;
const apKey=2;
const apDpi=4;
const apLed=8;
const apRate=16;
const apLod=32;
const apSensor=64;      //0x40
const apSensorMode=128; //0x80
const apDpiLevel=256;   //0x100  当前DPI挡位和总DPI挡位数
const apOnboardIndex=512; //0x200
const apReceiverLED=1024;  //0x400
const apDebounce=2048;  //0x800
const apSleepTime=4096;  //0x1000
const apALL=65535  //0xfffe

var gvar = new GVar;
var dvar = new DevCfg;
var curScheme = "light";  //light or dark

var curLang="zh";
var xml = {
    "en": {
    },
    "zh": {
    }
  };

function _20e0pnfczxl5(obj){
    if(typeof obj!=='object') return;  //判断是否是对象
    var newObj = obj instanceof Array?[]:{};  //数组还是对象
    for(var key in obj){   //遍历
        if(obj.hasOwnProperty(key)){
            let val = obj[key];
            newObj[key] = (typeof val==='object')?_20e0pnfczxl5(val):val;  //若val是对象则递归调用
        }
    }
    return newObj;
}
function _8lsdo5gy4qn8(){  //该函数初始化跟设备无关的配置部分
    if("light"==curScheme){
        gvar.lightColor="rgb(237,233,230)";  //浅色背景色
        gvar.deepColor="rgb(207,203,200)";  //深色背景色
        gvar.settingGroupColor="rgb(207,203,200)";  //dpi设置、回报率设置这些设置块的背景色
        gvar.textcolor="rgb(122,120,119)";  //文本的颜色
        gvar.checkColor="rgb(255,114,0)";

        gvar.keyBtnNr=gvar.deepColor;  //按键按钮的nr色
        gvar.keyBtnDn="rgb(255,114,0)";  //按键按钮的dn色
        gvar.keyBtnTextNr=gvar.textcolor;  //按键按钮文字的nr色
        gvar.keyBtnTextDn="rgb(20,20,20)";  //按键按钮文字的dn色

        gvar.proBtnNr = gvar.deepColor;
        gvar.proBtnDn = "rgb(184,180,180)";
        gvar.proBtnTextNr = gvar.textcolor;
        gvar.proBtnTextDn = "rgb(20,20,20)";
        gvar.lineColor = "rgb(164,161,160)";
        gvar.funNaviLineColorNr = "rgb(179,176,173)";
        gvar.funNaviLineColorDn = "rgb(13,13,13)";
        gvar.naviBtnDn = "rgb(20,20,20)";
        gvar.barThumbColor="rgb(182,179,176)";
        gvar.barTrackColor=gvar.deepColor;
        gvar.curDevColor="rgb(237,233,230)";   //当前设备信息面板的背景色
        gvar.curDevColor2="rgb(255,255,255)";  //“允许浏览器连接到您的设备” 右边的当前设备面板背景色
        gvar.curDevNameColor="rgb(0,0,0)";  //当前设备信息面板中设备名称的字体色
        gvar.gpTitleColor="rgb(0,0,0)";   //设置grid标题的颜色

        gvar.comboBkg = gvar.lightColor;  //组合键的背景色
        gvar.modiferColor = "rgb(0,0,0)"; //组合键modify框的check色
        gvar.comboBtn = gvar.keyBtnNr;

        gvar.welcomeTextColor1="rgb(0,0,0)";  //欢迎页面三行字的颜色
        gvar.welcomeTextColor2="rgb(90,90,90)";
        gvar.welcomeTextColor3="rgb(180,180,180)";
        gvar.dialogBkgColor="rgb(255,255,255)";  //对话框的背景色

        gvar.dialogBkgColorMacro="rgb(237,233,230)";  //宏编辑对话框的背景色
        gvar.macdlgitemcolor="rgb(207,203,200)";  //宏编辑对话框宏动作列表内item的背景色
        gvar.inputBkgColor="rgb(237,233,230)";   //编辑输入框的背景色
        gvar.dialogCancelColor="rgb(207,203,200)";  //对话框的取消按钮背景色
    }else if("dark"==curScheme){
        gvar.lightColor="rgb(23,23,22)";
        gvar.deepColor="rgb(46,45,45)";
        gvar.settingGroupColor="rgb(46,45,45)";
        gvar.textcolor="rgb(140,140,140)";
        gvar.checkColor="rgb(255,114,0)";

        gvar.keyBtnNr=gvar.deepColor;
        gvar.keyBtnDn="rgb(255,114,0)";
        gvar.keyBtnTextNr=gvar.textcolor;
        gvar.keyBtnTextDn="rgb(20,20,20)";

        gvar.proBtnNr = gvar.deepColor;
        gvar.proBtnDn = "rgb(31,30,30)";
        gvar.proBtnTextNr = gvar.textcolor;
        gvar.proBtnTextDn = "rgb(255,255,255)";
        gvar.lineColor = "rgb(92,90,89)";
        gvar.funNaviLineColorNr = "rgb(122,120,119)";
        gvar.funNaviLineColorDn = "rgb(255,255,255)";
        gvar.naviBtnDn = "rgb(255,255,255)";
        gvar.barThumbColor="rgb(61,60,59)";
        gvar.barTrackColor=gvar.deepColor;
        gvar.curDevColor="rgb(31,30,30)";
        gvar.curDevColor2=gvar.deepColor;
        gvar.curDevNameColor="rgb(255,255,255)";
        gvar.gpTitleColor="rgb(255,255,255)";

        gvar.comboBkg = gvar.lightColor;
        gvar.modiferColor = "rgb(255,255,255)";
        gvar.comboBtn = "rgb(46,45,45)";

        gvar.welcomeTextColor1="rgb(250,250,250)";  //欢迎页面三行字的颜色
        gvar.welcomeTextColor2="rgb(120,120,120)";
        gvar.welcomeTextColor3="rgb(69,68,67)";
        gvar.dialogBkgColor="rgb(46,45,45)";

        gvar.dialogBkgColorMacro="rgb(38,38,37)"; 
        gvar.macdlgitemcolor="rgb(61,60,59)";  
        gvar.inputBkgColor="rgb(38,38,37)";
        gvar.dialogCancelColor="rgb(38,38,37)";
        //gvar.dialogBtnColorNr="rgb(255,114,0)";//"rgb(46,45,45)";
    }
    let el;
    _dctq2ul76vxv("*", "color", gvar.textcolor);
    _dctq2ul76vxv(".deepcolor", "background", gvar.deepColor);
    _dctq2ul76vxv(".lightolor", "background", gvar.lightColor);
    _dctq2ul76vxv(".setting_group", "background", gvar.settingGroupColor);
    _dctq2ul76vxv(".probtn_bkg", "background", gvar.proBtnNr);
    _dctq2ul76vxv(".linecolor", "border-color", gvar.lineColor);
    _dctq2ul76vxv(".lstbar::-webkit-scrollbar-thumb", "background", gvar.barThumbColor);
    _dctq2ul76vxv(".lstbar::-webkit-scrollbar-track", "background", gvar.barTrackColor);
    _dctq2ul76vxv(".button", "background", gvar.keyBtnNr);
    _dctq2ul76vxv(".gp_title", "color", gvar.gpTitleColor);
    _dctq2ul76vxv(".combobkg", "background", gvar.comboBkg);
    _dctq2ul76vxv(".combobtn", "background", gvar.comboBtn);
    _dctq2ul76vxv(".cfgtitle", "color", gvar.gpTitleColor);
    _dctq2ul76vxv(".initfont", "color", gvar.textcolor);
    _dctq2ul76vxv(".macdlgitemcolor", "background", gvar.macdlgitemcolor); 
    _dctq2ul76vxv(".inputBkgColor", "background", gvar.inputBkgColor);
    _dctq2ul76vxv(".dpiMenuBkgColor", "background", gvar.inputBkgColor);
    _dctq2ul76vxv(".dgCancelColor", "background", gvar.dialogCancelColor);
    
    _dctq2ul76vxv(".gerDialog", "background", gvar.dialogBkgColor);  //对话框背景色
    _dctq2ul76vxv(".dgTitleColor", "color", gvar.gpTitleColor);   //对话框标题和按钮字体色

    //DPI编辑窗口的背景色
    _dctq2ul76vxv(".pop_content", "background", gvar.lightColor);  
    _dctq2ul76vxv(".pop_tri", "border-bottom-color", gvar.lightColor);    //窗口上方的小三角的背景色
    //if(null!=(el=document.getElementById("dpi_edit"))){ el.style.color=gvar.gpTitleColor; }

    if(null!=(el=document.getElementById("parent"))){ el.style.background=gvar.lightColor; }
    if(null!=(el=document.getElementById("dpi_bar_x"))){ el.style.background=gvar.barThumbColor; }
    if(null!=(el=document.getElementById("dpi_bar_y"))){ el.style.background=gvar.barThumbColor; }
    if(null!=(el=document.getElementById("new_pro"))){ el.style.background=gvar.proBtnDn; }
    if(null!=(el=document.getElementById("config_btn"))){ el.style.background=gvar.proBtnDn; }
    if(null!=(el=document.getElementById("buyDialog"))){ el.style.background=gvar.dialogBkgColorMacro; }
    //2个当前设备面板
    if(null!=(el=document.getElementById("curdev"))){ el.style.background=gvar.curDevColor; }
    if(null!=(el=document.getElementById("plug-d"))){ el.style.background=gvar.curDevColor2; }  //允许浏览器连接到您的设备 右边的当前设备面板背景色
    if(null!=(el=document.getElementById("devname1"))){ el.style.color=gvar.curDevNameColor; }
    if(null!=(el=document.getElementById("devname2"))){ el.style.color=gvar.curDevNameColor; }

    if(null!=(el=document.getElementById("w_bottom"))){ el.style.background = gvar.deepColor; el.style.color=gvar.textcolor; }
    if(null!=(el=document.getElementById("buylink"))){ el.style.color=gvar.welcomeTextColor2; }
    if(null!=(el=document.getElementById("w_text1"))){ el.style.color=gvar.welcomeTextColor1; }
    if(null!=(el=document.getElementById("w_text2"))){ el.style.color=gvar.welcomeTextColor2; }
    if(null!=(el=document.getElementById("w_text3"))){ el.style.color=gvar.welcomeTextColor2; }
    if(null!=(el=document.getElementById("w_text4"))){ el.style.color=gvar.welcomeTextColor3; }
    if(null!=(el=document.getElementById("w_text5"))){ el.style.color=gvar.welcomeTextColor3; }

    if(null!=(el=document.getElementById("i_text1"))){ el.style.color=gvar.welcomeTextColor1; }
    if(null!=(el=document.getElementById("i_text2"))){ el.style.color=gvar.welcomeTextColor2; }

    if(null!=(el=document.getElementById("sam"))){ el.style.background = gvar.deepColor; }
    if(null!=(el=document.getElementById("i_grd1"))){ 
        el.style.background=gvar.deepColor; 
        if(null!=(el=el.children.namedItem("i_text3"))) el.style.color=gvar.welcomeTextColor2;
    }
    if(null!=(el=document.getElementById("i_grd2"))){ 
        el.style.background=gvar.deepColor; 
        if(null!=(el=el.children.namedItem("i_text4"))) el.style.color=gvar.welcomeTextColor2;
    }

    //hz dialog
    if(null!=(el=document.getElementById("hzDialog"))){ el.style.background = gvar.dialogBkgColorMacro; }
    //if(null!=(el=document.getElementById("hzdlg_btn_cancel"))){ el.style.background = gvar.dialogBkgColorMacro; }

    //macro
    //if(null!=(el=document.getElementById("new_mac"))){ el.style.background = gvar.lightColor; }
    if(null!=(el=document.getElementById("import_mac"))){ el.style.background = gvar.lightColor; }
    if(null!=(el=document.getElementById("mac_nemu_content"))){ el.style.background = gvar.lightColor; }
    _dctq2ul76vxv(".mac_nemu_tri", "border-bottom-color", gvar.lightColor); 
    //macro record dialog
    if(null!=(el=document.getElementById("macroRecordDialog"))){ el.style.background = gvar.dialogBkgColorMacro; }

    if(null!=(el=document.getElementById("sampng"))){
        el.src=("dark"==curScheme)?"images/dark/sam.png":"images/light/sam.png"; 
    }
    if(null!=(el=document.getElementById("import_pro"))){
        el.src=("dark"==curScheme)?"images/dark/import.png":"images/light/import.png"; 
    }
    if(null!=(el=document.getElementById("buyico"))){
        el.src=("dark"==curScheme)?"images/dark/buy.png":"images/light/buy.png"; 
    }
    if(null!=(el=document.getElementById("config_btn_ico"))){
        el.src=("dark"==curScheme)?"images/dark/config.png":"images/light/config.png"; 
    }
    if(null!=(el=document.getElementById("i_grd2_ico"))){
        el.src=("dark"==curScheme)?"images/dark/config.png":"images/light/config.png"; 
    }
    if(null!=(el=document.getElementById("w_cfgico"))){
        el.src=("dark"==curScheme)?"images/dark/config.png":"images/light/config.png"; 
    }
    if(null!=(el=document.getElementById("w_cfgico"))){
        el.src=("dark"==curScheme)?"images/dark/config.png":"images/light/config.png"; 
    }
    if(null!=(el=document.getElementById("new_mac_ico"))){
        el.src=("dark"==curScheme)?"images/dark/new.png":"images/light/new.png"; 
    }
    if(null!=(el=document.getElementById("import_mac_ico"))){
        el.src=("dark"==curScheme)?"images/dark/import.png":"images/light/import.png"; 
    }

    if(null!=(el=document.getElementById("debounce_add"))){
        el.src=("dark"==curScheme)?"images/dark/add_nr.png":"images/light/add_nr.png"; 
    }
    if(null!=(el=document.getElementById("debounce_sub"))){
        el.src=("dark"==curScheme)?"images/dark/sub_nr.png":"images/light/sub_nr.png"; 
    }
    if(null!=(el=document.getElementById("sleep_add"))){
        el.src=("dark"==curScheme)?"images/dark/add_nr.png":"images/light/add_nr.png"; 
    }
    if(null!=(el=document.getElementById("sleep_sub"))){
        el.src=("dark"==curScheme)?"images/dark/sub_nr.png":"images/light/sub_nr.png"; 
    }
    _mue76ri9z8t8();
}

function rgb(r,g,b){ return (((b&0xff)<<16) | ((g&0xff)<<8) | (r&0xff)); }
function _owswde3gdu0j(color){ return (color&0xff); }
function _0rczknozfyo0(color){ return ((color>>8)&0xff); }
function _6zvfvsdekk9x(color){ return ((color>>16)&0xff); }
function _d4yxxbv3xz2z(color){
    let str="rgb(";
    str += _owswde3gdu0j(color) + ",";
    str += _0rczknozfyo0(color) + ",";
    str += _6zvfvsdekk9x(color);
    str += ")";
    return str;
}
function _3vssyw48ifn3(color){
    let str="#";
    let r=_owswde3gdu0j(color), g=_0rczknozfyo0(color), b=_6zvfvsdekk9x(color);
    str += b.toString(16).toLocaleUpperCase().padStart(2, "0");  
    str += g.toString(16).toLocaleUpperCase().padStart(2, "0");
    str += r.toString(16).toLocaleUpperCase().padStart(2, "0");
    return str;
}
function _xyj70n44lvui(str){
    if(null==str || ""==str) return null;
    //parseInt("12")返回的值是12，parseInt("0x12")返回的值是18，parseInt('25w5')返回的值是25，parseInt('ab25')返回的值是NaN
    let val = parseInt(str);
    return (Number.isNaN(val))?null:val;
}

function _snkns21mqltd(parent, id){  //在parent元素的后代元素里找指定id属性的元素
    if(null==parent) return null;
    let el = parent.children.namedItem(id);
    if(null!=el) return el;
    for(let i=0; i<parent.children.length; i++){
        el = parent.children.item(i);   //取第i个子元素
        if(el.children.length>0){  //若该元素有子元素
            el = _snkns21mqltd(el, id);
            if(null!=el) return el;
        }
    }
    return null;
}
function _3pxphwi6fe06(parent, tag){  //在parent元素的后代元素里找指定标签名的元素，<img>元素的标签名为IMG，<div>元素的标签名为DIV
    if(null==parent) return null;
    for(let i=0; i<parent.children.length; i++){
        let el = parent.children.item(i);   //取第i个子元素
        if(el.tagName==tag) return el;
        if(el.children.length>0){  //若该元素有子元素
            if(null!=(el = _3pxphwi6fe06(el, tag))) return el;
        }
    }
    return null;
}
//设置<style>标签里的样式规则，参数select是{}前的选择子字符串，attr是被修改的样式属性名，value是属性的新值
//_dctq2ul76vxv(".navi", "font-size", "13px"); 是将.navi{}样式规则里的font-size设为13px
function _dctq2ul76vxv(select, attr, value){
    for(let i=0; i <document.styleSheets.length; i++){
        let styleSheet = document.styleSheets[i];
        for(let k=0; k<styleSheet.cssRules.length; k++){
            let rule = styleSheet.cssRules[k];
            if(rule instanceof CSSStyleRule){
                //console.log(rule.style.cssText);
                if(select==rule.selectorText){
                    rule.style.setProperty(attr, value); return;
                }
            }
        }
    }

}


function _tm04k3yhdfcj(kf)
{
    let str="";
    if(fKeyboard==kf.major){
        if(kf.modifer&mdfCtrlL){ 
            if(""!=str) str+=" + ";
            str+="Ctrl"; 
        } 
        if(kf.modifer&mdfShiftL){
            if(""!=str) str+=" + ";
            str+="Shift"; 
        }
        if(kf.modifer&mdfAltL){
            if(""!=str) str+=" + ";
            str+="Alt"; 
        }
        if(kf.modifer&mdfWinL){
            if(""!=str) str+=" + ";
            str+="Win"; 
        } 
        if(kf.modifer&mdfCtrlR){
            if(""!=str) str+=" + ";
            str+="RCtrl"; 
        } 
        if(kf.modifer&mdfShiftR){
            if(""!=str) str+=" + ";
            str+="RShift"; 
        }
        if(kf.modifer&mdfAltR){
            if(""!=str) str+=" + ";
            str+="RAlt"; 
        }
        if(kf.modifer&mdfWinR){
            if(""!=str) str+=" + ";
            str+="RWin"; 
        }
        let t = _ffw0a6dpikxi(kf.minor);
        if(""!=t){
            if(""!=str) str+=" + ";
            str += t;
        } 
    }else if(fMouse==kf.major){
        switch(kf.minor)
        {
            case fmsCLICK: str=xml[curLang]["click"]; break;
            case fmsMENU: str=xml[curLang]["menu"]; break;
            case fmsMIDDLE: str=xml[curLang]["mid"]; break;
            case fmsFORWARD: str=xml[curLang]["forward"]; break;
            case fmsBACK: str=xml[curLang]["back"]; break;
            case fmsDBCLICK: str=xml[curLang]["dclick"]; break;
            case fmsSU: str=xml[curLang]["sr"]; break;
            case fmsSD: str=xml[curLang]["sd"]; break;

            case favDPI: str=xml[curLang]["dpi"]; break;
            case favDPIINC: str="DPI+"; break;
            case favDPIDEC: str="DPI-"; break;
            case favOFF: str=xml[curLang]["off"]; break;
            case favProfile: str=xml[curLang]["msg44"]; break;
            case favFIRE: str=xml[curLang]["fire"]; break;
            default:;
        }
    }else if(fMedia==kf.major){
        switch(kf.minor)
        {
            case fmePLAYER: str=xml[curLang]["media1"]; break;
            case fmePLAYPAUSE: str=xml[curLang]["media2"]; break;
            case fmeSTOP: str=xml[curLang]["media3"]; break;
            case fmePREVIOUS: str=xml[curLang]["media4"]; break;
            case fmeNEXT: str=xml[curLang]["media5"]; break;
            case fmeVOLINC: str=xml[curLang]["media6"]; break;
            case fmeVOLDEC: str=xml[curLang]["media7"]; break;
            case fmeMUTE: str=xml[curLang]["media8"]; break;
            case fmeEMAIL: str=xml[curLang]["media10"]; break;
            case fmeCAL: str=xml[curLang]["media9"]; break;
            case fmeEXPLORER: str=xml[curLang]["media12"]; break;
            case fmeHOME: str=xml[curLang]["media11"]; break;
            case fmeFAVOR: str=xml[curLang]["media13"]; break;
            case fmeREFRESH: str=xml[curLang]["media14"]; break;
            case fmeFORWARD: str=xml[curLang]["media17"]; break;
            case fmeBACK: str=xml[curLang]["media18"]; break;
            case fmeSEARCH: str=xml[curLang]["media15"]; break;
            default:;
        }
    }else if(fMacro==kf.major){
        let t = lstMacro.findMacro(kf.itemdata);
        if(null!=t)
            str = xml[curLang]["macro"] + " - " + t.name;
    }else if(fAdv==kf.major){
        switch(kf.minor)
        {
            
            default:;
        }
    }
    return str;
}

function _hhj16528zqla(u8Array){  //Uint8Array转成普通数组
    return Array.from(u8Array);
}
function _f8uru7mni9r1(path){  //从文件路径中提取文件名部分（不含扩展名）
    let start = path.lastIndexOf("/");
    if(-1==start) start=0; else start++;   //若找不到/，可能path没有路径部分，只是文件名部分，例如 test.icm
    let end = path.lastIndexOf(".");
    if(-1==end) end=path.length;
    return path.substring(start, end);
}

//数组转成16进制字符串，buffer是一个具有slice()方法的对象，例如Array、ArrayBuffer、Uint8Array
//打印从start开始的length个值，sep是值之间的分隔符，默认是空格
//padStart(2, "0")的作用是若字符串长度不足2个字符，就用"0"填充
const bufferToHexString = (buffer, start, length, sep = " ") =>
    Array.from(new Uint8Array(buffer.slice(start, start + length)))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join(sep);
 //16进制字符串转换为数组
 const hexStringToNumberArray = (hexString) => hexString.match(/[\da-f]{2}/gi).map((h) => parseInt(h, 16));

//let ss = _0bb17qc4rf1e("End");
//let s2 = _ffw0a6dpikxi(ss);

var mylog = console.log.bind(console);
function _6bjfy86tsvqh(buf, prex){  //buf is a ArrayBuffer
    let str="" + prex;
    let bf = new Uint8Array(buf);
    for(let i=0; i<bf.length; i++) str+=bf[i].toString(16)+" ";  //16HEX
    mylog(str);//console.log(str);
  }
  function _7co8ov5vg9r9(ary, prex){  //buf is a Array
    let str="" + prex;
    for(let i=0; i<ary.length; i++) {
        if(i==27)
            i=27;
        str += ary[i].toString(16)+" ";  //16HEX
    }
        
    mylog(str);//console.log(str);
  }