import React from 'react';

const Accordian = (props) => {
  const renderItems = props.items.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <div className="title active">
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className="content active">
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="ui styled accordion">
    {renderItems}
    </div>
  );
};

export default Accordian;
