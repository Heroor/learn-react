// 各种条件渲染

function Warning ({text}) {
    return (<div className="Warning">Warning: {text}<div/>)
}

function Error ({text}) {
    return (<div className="Error">Error: {text}<div/>)
}

function Info ({text}) {
    return (<div className="Info">Info: {text}<div/>)
}

function NotificationDialog({title, text, state}) {
    return (
        <div>
            {title && <p>{title}</p>} // 使用&&运算符
            {Notification(text)[state]}
        </div>
    )
}

// 枚举
const Notification = text => ({
    error: <Error text={text}/>,
    warning: <Warning text={text}/>,
    info: <Info text={text}/>
})








/*-----------------more example------------------*/

function FooBarOrFooOrBar({ isFoo, isBar }) {
    const key = `${isFoo}-${isBar}`;
    return (
        <div>
            {{
                ['true-true']: <FooBar />,
                ['true-false']: <Foo />,
                ['false-true']: <Bar />,
                ['false-false']: null,
            }[key]}
        </div>
    );
}

FooBarOrFooOrBar.propTypes = {
     isFoo: React.PropTypes.boolean.isRequired,
     isBar: React.PropTypes.boolean.isRequired,
}









// HOC declaration

function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component { ...props } />;
    }

    return <div><p>Loading...</p></div>;
  };
}

// Usage
const ListWithLoadingIndicator = withLoadingIndicator(List);

// use
<ListWithLoadingIndicator
    isLoading={props.isLoading}
    list={props.list}
/>
