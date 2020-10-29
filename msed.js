// Многострочный редактор (С) А.А.Дуванов АЗЫ ИНФОРМАТИКИ RU 2002 (29/05/02)
// -------------------------------------------------------------
// Проверка на work == sourse (строки)
// Выдает -1 или номер позиции в work в которой обнаружена ошибка
// -----------------------------

var okMessRU = '<CENTER><IMG src=./pic/prav30.gif width=56 height=60 onmouseover="this.src=\'./pic/prav31.gif\'" onmouseout="this.src=\'./pic/prav30.gif\'" border=0 alt="Профессор"> <TT>Ошибок нет</TT></CENTER>'
var isErrMsedRU = true; // индикатор ошибки

function checkerRU(work, sourse)
{
  // Сравнение по лексемам

  var lexWork = new lexerRU(work);
  var lexSourse = new lexerRU(sourse);

  lexSourse.getLex();
  lexWork.getLex();
  for (;;)
  {
    if (lexSourse.lex == "" && lexWork.lex == "") return -1; // Ок!
    if (lexSourse.lex != lexWork.lex) break;                 // Ошибка
    //alert(lexSourse.lex+"---"+lexWork.lex);
    lexSourse.getLex();
    lexWork.getLex();
  }

  // Определение места ошибки.

  if (lexWork.lex == "")     // неполный текст
       return work.length;
  if (lexSourse.lex == "")   // лишний текст
       return lexWork.posold;
  // Ошибка внутри лексемы (или сразу за ней). Найдем ее место.
  for(var pos=0; pos<lexSourse.lex.length; pos++)
  {
      if(pos >= lexWork.lex.length) break;
      if(lexSourse.lex.charAt(pos) != lexWork.lex.charAt(pos)) break;
  }
  return lexWork.posold+pos;
}


// Лексер (разборщик текста по лексемам).
// На входе строка, которую предстоит разобрать.
// Лексемы разделяются пробелами и концами строк
// ---------------------------------------------
function lexerRU(str)
{
  this.str    = str; // Ссылка на разбираемую строку
  this.pos    = 0;   // Начало (индекс) текущего разбора
  this.posold = 0;   // Начало (индекс) предыдущего разбора
  this.lex    = "";  // Текущая выделенная лексема

  this.getLex = _getLexRU; // Получить очередную лексему
}

// Получить очередную лексему
// --------------------------
function _getLexRU()
{
  this.lex= ""
  // Пропускаем первые пробелы и концы строк
  for(; this.pos < this.str.length; this.pos++)
    if (this.str.charAt(this.pos) != " "  &&
        this.str.charAt(this.pos) != "\r" &&
        this.str.charAt(this.pos) != "\n") break;

  if(this.str.charAt(this.pos) == "\r") this.pos++;
  this.posold = this.pos;

  // Выделяем лексему
  for(; this.pos < this.str.length; this.pos++)
    if (this.str.charAt(this.pos) == " " ||
        this.str.charAt(this.pos) == "\r") break;
    else this.lex += this.str.charAt(this.pos);
}

// Диагностика  ошибок
// -------------------
// work   -- содержимое редактора строки
// sourse -- контрольный текст
//
// Возвращает HTML-код для вывода в поле диагностики
// -----------------------------
function showErrRU(work,sourse)
{
  isErrMsedRU = false;
  var str = "";
  var pos = checkerRU(work, sourse);
  if (pos == -1)  str += okMessRU;
  else
  {
    isErrMsedRU = true;
    str += work.substring(0, pos);
    str += "<SPAN class=errmark>";
    if (pos < work.length) str += work.charAt(pos);
    else                   str += "__";
    str += "</SPAN>";
    pos++;
    str += work.substring(pos);
  }

  var s = "";
  var posold = 0;
  pos   = 0;
  for(;;)
  {
     pos = str.indexOf("\r",pos);
     if (pos == -1) {s += str.substring(posold); break;}
     else
     {
       s += str.substring(posold,pos);
       s += "<BR>"
       pos += 2;
       posold = pos;
     }
  }
  return s;
}

// Выделитель строк в text
// -----------------------
function linerRU(text)
{
  this.text    = text;  // Указатель на текст, в котором выделяются строки
  this.line    = "";    // Выделенная строка
  this.pos     = 0;     // Начало (индекс) текущего разбора
  this.posold  = 0;     // Начало (индекс) предыдущего разбора
  this.endtext = false; // Признак конца текста

  this.getLine = _getLineRU; // Получить очередную строку
}

// Получить очередную строку
// --------------------------
function _getLineRU()
{
  this.line = "";
  this.posold = this.pos;
  // Выделяем строку
  for(; this.pos < this.text.length; this.pos++)
    if (this.text.charAt(this.pos) == "\r") break;
    else this.line += this.text.charAt(this.pos);
  this.pos += 2;
  if (this.pos >= this.text.length) this.endtext = true;
}

// Проверка на work == sourse (по строкам)
// ---------------------------------------
function checkerLineRU(work, sourse, beginblank)
{

  var lineWork   = new linerRU(work);
  var lineSourse = new linerRU(sourse);
  var pos;

  for (;;)
  {
     // Выделим очередные строки
     lineWork.getLine();
     lineSourse.getLine();
     //alert("<"+lineWork.line+">"+"<"+lineSourse.line+">")

     if (beginblank && lineWork.line.charAt(0) == " ")
     {
        // Ошибка: пробел в начале строки
        return lineWork.posold;
     }
     if (lineWork.endtext && lineSourse.endtext) return -1; // Ок!
     // Сравнение строк по лексемам
     if ((pos=checkerRU(lineWork.line, lineSourse.line)) != -1) break;
  }

  // Определение места ошибки.

  /*
  if (lineWork.line == "")     // неполный текст
       return work.length;
  if (lineSourse.line == "")   // лишняя строка
       return lineWork.posold;
  */

  return lineWork.posold+pos;
}

// Диагностика  ошибок (для проверки по строкам)
// -------------------
// work   -- содержимое редактора строки
// sourse -- контрольный текст
// beginblank == true, если пробел в начале строки -- ошибка
// Возвращает HTML-код для вывода в поле диагностики
// -----------------------------
function showErrLineRU(work,sourse, beginblank)
{
  isErrMsedRU = false;
  var str = "";
  var pos = checkerLineRU(work, sourse, beginblank);
  if (pos == -1)  str += okMessRU;
  else
  {
    isErrMsedRU = true;
    str += work.substring(0, pos);
    str += "<SPAN class=errmark>";
    if (work.charAt(pos) == "\r") str += "__\r\n";
    else if (pos < work.length) str += (work.charAt(pos) == " ") ? "__":work.charAt(pos)
    else                   str += "__";
    str += "</SPAN>";
    pos++;
    str += work.substring(pos);
  }

  var s = "";
  var posold = 0;
  pos   = 0;
  for(;;)
  {
     pos = str.indexOf("\r",pos);
     if (pos == -1) {s += str.substring(posold); break;}
     else
     {
       s += str.substring(posold,pos);
       s += "<BR>"
       pos += 2;
       posold = pos;
     }
  }
  //alert(s);
  return s;
}
