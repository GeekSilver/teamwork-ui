import React from "react";

let difference;
let daysDifference;
let hoursDifference;
let minutesDifference;
let secondsDifference;

const elapsedTime = (startDate) => {
  difference = new Date() - new Date(startDate);

  daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24

  hoursDifference = Math.floor(difference/1000/60/60);
  difference -= hoursDifference*1000*60*60

  minutesDifference = Math.floor(difference/1000/60);
  difference -= minutesDifference*1000*60

  secondsDifference = Math.floor(difference/1000);

  if (daysDifference >= 30 ){
    if ((daysDifference/30) >= 12){
      return Math.floor((daysDifference/30)/12)+'y';
    }
    return  Math.floor(daysDifference/30)+'mo';
  }
  else if (daysDifference >= 7 ){
    if((daysDifference/7) >= 1){
      return Math.floor(daysDifference/7)+'w';
    }
    return daysDifference+'d';
  }
  else if(daysDifference < 7){
    if(daysDifference >= 1){
      return daysDifference+'d';
    }
    else if(hoursDifference >= 1){
      return hoursDifference+'h';
    }
    else if(minutesDifference >= 1){
      return minutesDifference+'m';
    }
    else if(secondsDifference >=1){
      return secondsDifference+'s';
    }
  }
};



const Author = (props) =>{
    return (
      <div className="d-flex align-items-center justify-content-around">
        <h4 className=" text-dark font-weight-light py-1">
          {props.title}
        </h4>  
        <p className="align-self-end">
          {props.author} { elapsedTime(props.created_at)}  
        </p>           
      </div>

    );
}

export default Author;