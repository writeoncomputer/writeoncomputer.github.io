function item(pic_over, pic_out, name,link)
{
  this.pic_over = new Image();
  this.pic_out = new Image();
  this.pic_over.src=pic_over;
  this.pic_out.src=pic_out;
  this.name = name;
  this.link = link;
}
function MenuPic(name,base,ext,width,height,beginnum)
{
  this.beginnum =beginnum;
  this.name   = MenuPic.arguments[0];
  this.width  = width;
  this.height = height;
  this.dh = 0;
  this.items  = new Array();
  this.len;
  this.ismenu = MenuPic.arguments.length > 7;
  this.Show = _Show;
  if(this.ismenu)
  {
    var j=0;
    for(var i=6; i<MenuPic.arguments.length; i+=2)
    {
      var num = 0+j+this.beginnum;
      if(num < 10)  num = "0"+num;
      this.items[j] = new item(base+num+"2."+ext,
                                 base+num+"1."+ext,
                                 MenuPic.arguments[i],
                                 MenuPic.arguments[i+1]);
      j++;
    }
    this.len=j;
  }
}
function _Show()
{
 if (this.ismenu)
 {
   document.write("<NOBR>");
   for(var i=0; i<this.len; i++)
   {
     var str=
      "<A href="+this.items[i].link+
      " onmouseover=\"document.images."+this.name+i+".src='"+
         this.items[i].pic_over.src+"'\""+
      " onmouseout=\"document.images."+this.name+i+".src='"+
         this.items[i].pic_out.src+"'\""+
      "><IMG name="+this.name+i+" border=0 src="+this.items[i].pic_out.src+
      " width="+this.width+" height="+this.height+
      " alt=\""+this.items[i].name+"\"></A>";

     if (this.dh) str +=
      "<IMG src=./pic/empty.gif width="+this.dh+" height=1 alt='' border=0>";
     document.write(str);
   }

   document.write("</NOBR>");
 }
}
