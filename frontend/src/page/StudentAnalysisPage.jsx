
import { useEffect, useState } from "react";

function StudentAnalysisPage(){
    const[dangerStd, SetDangerStd] = useState([]);
    const[excellentStd, SetExcellentStd] = useState([]);

    const getAnalysis = async()=> {
        const respose = await fetch("http://localhost:8000/analysis/student-status");
        const data = await respose.json();
        SetDangerStd(data.danger_std);
        SetExcellentStd(data.excellent_std);
    };

    useEffect( () =>{
        getAnalysis();
    }, []);

    return(
        <div>
            <session>
                <h2>관리 학생</h2>
                <table>
                    <tr>
                        <th>이름</th>
                        <th>평균점수</th>
                        <th>출석률</th>
                        <th>상태</th>
                    </tr>
                    {dangerStd.map((std) => (
                    <tr>
                        <td>{std.name}</td>
                        <td>{std.avg_score}</td>
                        <td>{std.attend_rate}</td>
                        <td>{std.status}</td>
                    </tr>
                    ))}
                </table>
            </session>
            <session>
                <h2>우수 학생</h2>
                <table>
                    <tr>
                        <th>이름</th>
                        <th>평균점수</th>
                        <th>출석률</th>
                        <th>상태</th>
                    </tr>
                    {excellentStd.map((std) => (
                    <tr>
                        <td>{std.name}</td>
                        <td>{std.avg_score}</td>
                        <td>{std.attend_rate}</td>
                        <td>{std.status}</td>
                    </tr>
                    ))}
                </table>
            </session>
        </div>
    )
}

export default StudentAnalysisPage