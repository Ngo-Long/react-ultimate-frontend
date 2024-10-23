import "./style.css";

const MyComponent = () => {
    const myName = "ngo kim long";

    return (
        <>
            <div className="heading" style={{ marginTop: "150px", paddingRight: "200px" }}
            >{myName} dep trai</div>
        </>

    );
};

export default MyComponent;