/* 
If hh < 10 (0,1,2,3,4,5,6,7,8,9) => '0' + h:mm + 'hours' (02:20 hours)
If mm < 10 (0,1,2,3,4,5,6,7,8,9) => hh:'0' + m + 'hours' (10:06 hours)
If hh = 1 => hh:mm + 'hour' (01:30 hour) 
*/

export const getCourseDuration = (minutes) => {
  let h = Math.floor(minutes / 60);
  let m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return `${h}:${m} hours`; // Duration format: hh:mm + 'hours'
};
