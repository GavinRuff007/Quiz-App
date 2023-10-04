import Link from "next/link";

export default function Home() {
    const copyrightContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(255, 255, 255, 0.8)", // Opacity
      };
      
      const copyrightStyle = {
        textAlign: "center",
        fontSize: "14px",
        color: "#333", // Text color
        padding: "10px", // Padding around the copyright notice
      };
    return (
        <main>
            <div className="container">
                <h1>اپلیکیشن اطلاعات عمومی </h1>
                <div className="quiz-container">
                <p  >در این برنامه قصد داریم تا ۱۵ سوال اطلاعات عمومی را بپرسیم که اگر بتوانید بالای ۶۰ درصد درست جواب بدهید یعنی اطلاعات عمومی خوبی دارید</p>
                </div>
                
                <Link href="/#quiz">
                    <button>شروع آزمون</button>
                </Link>
            </div>
            <div style={copyrightContainerStyle}>
            <p style={copyrightStyle}> &copy; 2023 Parsa Eftekharmanesh  All rights reserved</p>
            </div>
        </main>
    );

}
