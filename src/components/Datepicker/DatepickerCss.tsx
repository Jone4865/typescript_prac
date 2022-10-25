import React from "react";

const CalendarCss = () => {
  return <style>{css}</style>;
};
export default CalendarCss;

const css = `
.rdp {
  --rdp-cell-size: 46px;
  --rdp-accent-color: #70CCA6;
  --rdp-outline: none;
}
.rdp-day_outside {
  color: #DADADA;
}

.rdp-caption {
  width: 322px;
  height: 81px;

  background: #2C8D65;
}

.rdp-caption_label{
  color : #fff
}

.rdp-head_row,
.rdp-head,
.rdp-head_cell {
  background: #70CCA6;
  margin : 0;
  color : #fff;
}

.DayPicker-Day--monday {
  color: #00bcd4;
}

.rdp-nav_button {
  color : #fff;
}

.rdp-day_range_middle {
  border-radius: 0;
}

.rdp:not([dir='rtl']) .rdp-day_range_start:not(.rdp-day_range_end) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 40px;
  border:0;
  margin-right: -1px;
}

.rdp-day_range_middle {
  border-radius: 0;
  border: 0;
  height: 40px;
  margin-left: -1px;
}

.rdp:not([dir='rtl']) .rdp-day_range_end:not(.rdp-day_range_start) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 40px;
  border:0;
  transform: translate(-2px,0);
}

.my-today { 
  font-weight: bold;
  font-size: 140%; 
  color: red;
}
`;