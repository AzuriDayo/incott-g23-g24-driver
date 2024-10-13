function _vmhh13pskslw(v){  //参数是一个DevCfg对象
    //if(!(v instanceof DevCfg)) return;

    //注意，按键矩阵9的键码已经用于存储当前配置序号，若硬件位置9处有按键，记得更改当前配置的存储位置
    //因为这款鼠标硬件只有一个配置，界面上却有4个板载，所以板载切换时，其实是把PC上存储的新板载的配置“灌入”鼠标而已
    v.key = new Array(6);
    v.key[0] = new KeyInfo(fMouse, fmsCLICK); v.key[0].matrix=0;
    v.key[1] = new KeyInfo(fMouse, fmsMENU); v.key[1].matrix=1;
    v.key[2] = new KeyInfo(fMouse, fmsMIDDLE); v.key[2].matrix=2;
    v.key[3] = new KeyInfo(fMouse, fmsFORWARD); v.key[3].matrix=4;
    v.key[4] = new KeyInfo(fMouse, fmsBACK); v.key[4].matrix=3;
    v.key[5] = new KeyInfo(fMouse, favDPI); v.key[5].matrix=5;
    //v.key[6] = new KeyInfo(fAdv, favDPI);
    //v.key[6].hide = true;  //not show this button on UI

    v.defDPIInx = 1;   //默认处在第几档，恢复默认时需要
    v.dpicolor = new Array(6);
    v.dpicolor[0] = rgb(255,0,0);
    v.dpicolor[1] = rgb(0,0,255);
    v.dpicolor[2] = rgb(0,255,0);
    v.dpicolor[3] = rgb(255,255,0);
    v.dpicolor[4] = rgb(0,255,255);
    v.dpicolor[5] = rgb(255,0,255);
    v.dpi = [400, 800, 1600, 2400, 3200, 6400];
    v.dpiUI = new Array();
    v.dpiHW = new Array();
    let i=0, val=100, hw=1;
    while(1){   //3395和3950的规格都是 50~32000步进50，硬件值范围0~639（但是驱动只做步进100）
        if(val>32000) break;
        v.dpiUI[i]=val;
        v.dpiHW[i]=hw;
        val += 100;
        hw += 2;   //界面是步进100的，所以硬件步进值是2
        i++;
    }

    v.lodUI = [0.7, 1, 2];
    v.lodHW = [0, 1, 2];
}

var getHwForDpi = (dpi)=>{
    for(let i=0; i<dvar.dpiUI.length; i++){
        if(dpi==dvar.dpiUI[i]) return dvar.dpiHW[i];
    }
    return -1;
};