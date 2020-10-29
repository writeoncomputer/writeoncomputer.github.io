function CopyrRU()
{
  var okno = "scrollbars=1,fullscreen=0,status=0,toolbar=0,top=0,left=0,width=620,height=440,resizable=1";
  var href = "copyr.htm";
  if(arguments.length) href = arguments[0] + href;
  window.open(href, null, okno);
}

function  NewBrouserRU(html, okno)
{
   var num;
   if (NewBrouserRU.arguments.length < 2)
      num = window.open(html,"","left=100,top=100,width=500,height=400,menubar=1,resizable=1,scrollbars=1");
   else
      num = window.open(html,"", okno);
   return num;
}

// Универсальный Зачетный класс (C) март, 2000, А.А.Дуванов
// Объект CheckTasks длЯ проверки решений Зачетного класса
//---------------------------------------------------------

// Рекомендации по использованию
// -----------------------------
// 1) Создать объект до входа в зачетный класс
// 2) По событию click на кнопке type="reset" вызывать метод Ini();
//    form - ссылка на форму, в которую "одет" Зачетный класс
// 3) Решение задачи с номером i фиксировать методом Check(i);
// 4) Общую оценку выводить методом Bonus();


// Конструктор объекта
// -------------------
// Входные данные конструктора
// num  - число задач
// form - форма, в которую одет зачетный класс
// rez  - основа имени длЯ строки, в которую выводитсЯ сообщение
//        о правильности выполнениЯ i-го заданиЯ.
//        Например, пусть основа есть "result". Тогда теги INPUT
//        длЯ вывода информационного сообщениЯ должны иметь имена:
//        "result1" -- длЯ первой задачи
//        "result2" -- длЯ второй задачи
//         ...
// Можно не задавать аргумент rez, тогда по умолчанию он будет
// определен как "result".

function CheckTasks(num, forma, rez)
{
  // свойства объекта
  this.Num        = num;            // число заданий
  this.Forma      = forma;
  this.Task       = new Array();    // если задача решалась -- true
  this.Error      = 0;              // число ошибок
  this.Yes        = "верно";        // верный ответ
  this.No         = "есть ошибки";  // неверный ответ
  this.Answer;                      // результат проверки ответа
  this.Rez = rez ? rez:"result";    // основа имени тега с инф. сообщением

  // методы объекта
  this.Ini   = _Ini;   // начальные установки
  this.Check = _Check; // проверка заданиЯ
  this.Bonus = _Bonus; // вывод оценки

  for(var i=0; i<this.Num; i++) this.Task[i] = false; // задачи не решались
  this.Forma.reset();
}


//--------------------------------------------------------
// начальные установки
// -------------------
function _Ini()
{
  this.Error = 0;                                     // ошибок нет
  for(var i=0; i<this.Num; i++) this.Task[i] = false; // задачи не решались
  this.Forma.reset();

}

//--------------------------------------------------------
// Фиксирование решениЯ задачи с номером ntask
// -------------------------------------------
// Задачи нумеруютсЯ от 1 до this.Num

function _Check(ntask)
{
  // Защита от неверных данных
  if (ntask < 1 || ntask > this.Num)
  { alert("Неверный номер задачи: "+ntask); return;}

  this.Task[ntask-1] = true;                 // задача решалась
  if (this.Answer == this.No) this.Error++;  // ошибки суммируютсЯ
  var temp = this.Answer;
  eval("this.Forma.result"+ntask+".value=temp");
}

//--------------------------------------------------------
// Вывести оценку
// --------------
// Алгоритм определениЯ оценки:
//
// 5 - ошибок нет
// 4 - ошибок меньше 2/5 от числа задач
// 3 - ошибок меньше 1/2 от числа задач
// 2 - в остальных случаЯх

function  _Bonus()
{
   var result = "";
   var bonus;
   var ntask;

   // Проверим, все ли задачи были решены
   ntask = 0;
   for(var i=0; i<this.Num; i++)
     if (this.Task[i]) ntask++;
     else result += eval(i+1)+", ";
   // задачи решены все, вычислЯем оценку
   if (ntask == this.Num)
   {
     if (!this.Error)                    bonus = 5;
     else if (this.Error < 2*this.Num/5) bonus = 4;
     else if (this.Error < this.Num/2)   bonus = 3;
     else                                bonus = 2;
     //alert("\nВаша оценка: "+bonus+"\n"+
     //      "Число ошибок: "+ this.Error);
     var arg = Array(bonus, this.Error);
     window.showModalDialog("../bonus.htm", arg,
       "dialogWidth:340px;dialogHeight:390px;cеnter:yes;help:no;status:no");

   }
   // задачи решены не все, сообщаем, какие не решались
   else
   {
    var str=result;
    if (result.charAt(result.length-2) == ",")
          str = result.substring(0,result.length-2);
    alert("\nНе решены задани\я:\n" + str);
   }
}

// Меню с виртуальными кнопками
// ============================

// Конструктор
// -----------
function menuTVKeyRU(name,width,height,itemspic,rems,makes)
{
  this.width    = width;
  this.height   = height;
  this.name     = name;
  this.itemspic = new Array();
  this.rems     = new Array();
  this.makes    = new Array();
  this.bgcolor  = "#EEE5DB";
  this.borderLeftColor  = "white";
  this.borderRightColor = "gray";
  for (var i=0; i<itemspic.length; i++)
  {
   this.itemspic[i] = itemspic[i];
   this.rems[i]  = rems[i];
   this.makes[i] = makes[i];
  }

  this.show = _showRU;

}

// Вывод меню
// ----------

function _showRU()
{
  var str = "<TABLE border=0 cellspacing=0 cellpadding=10><TR valign=center>";
  for(var i=0; i<this.itemspic.length;i++)
  {
    str += "<TD style=\"border-style:solid;border-width:1px;";
    str += "border-left-color:"+this.bgcolor;
    str += ";border-top-color:"+this.bgcolor;
    str += ";border-right-color:"+this.bgcolor;
    str += ";border-bottom-color:"+this.bgcolor+"\" ";
    str += " onmouseover=\"this.style.borderLeftColor=this.style.borderTopColor='"+this.borderLeftColor;
    str += "';this.style.borderRightColor=this.style.borderBottomColor='"+this.borderRightColor+"'\"";
    str += " onmouseout=\"this.style.borderLeftColor=this.style.borderTopColor=this.style.borderRightColor=this.style.borderBottomColor='"+this.bgcolor;
    str += "';document.all['"+this.name+i+"'].style.left=document.all['"+this.name+i+"'].style.top='0px'"+"\"";
    str += " onmousedown=\"this.style.borderLeftColor=this.style.borderTopColor='"+this.borderRightColor;
    str += "';this.style.borderRightColor=this.style.borderBottomColor='"+this.borderLeftColor;
    str += "';document.all['"+this.name+i+"'].style.left=document.all['"+this.name+i+"'].style.top='1px'"+"\"";
    str += " onmouseup=\"this.style.borderLeftColor=this.style.borderTopColor=this.style.borderRightColor=this.style.borderBottomColor='"+this.bgcolor;
    str += "';document.all['"+this.name+i+"'].style.left=document.all['"+this.name+i+"'].style.top='0px'"+"\"";
    str += " onclick = \""+this.makes[i]+"\">";
    str += "<IMG id="+this.name+i+" style=\"position:relative\" ";
    str += "src="+itemspic[i]+" width="+this.width+" height="+this.height;
    str += " alt=\""+rems[i]+"\" border=0 hspace=0 vspace=0></TD>";
    // if(i==0) alert(str);
  }
  str += "</TR></TABLE>";

 document.write(str);
}
