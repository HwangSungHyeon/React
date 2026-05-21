import { useEffect, useState } from "react";

function StudentAnalysisPage() {

    const [dangerStd, SetDangerStd] = useState([]);
    const [excellentStd, SetExcellentStd] = useState([]);

    const getAnalysis = async () => {
        const response = await fetch("http://localhost:8000/analysis/student-status");

        const data = await response.json();

        SetDangerStd(data.danger_std);
        SetExcellentStd(data.excellent_std);
    };

    useEffect(() => {
        getAnalysis();
    }, []);

    return (
        <div>

            <section>
                <h2>관리 학생</h2>

                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>평균점수</th>
                            <th>출석률</th>
                            <th>상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dangerStd.map((std, index) => (
                            <tr key={index}>
                                <td>{std.name}</td>
                                <td>{std.avg_score}</td>
                                <td>{std.attend_rate}</td>
                                <td>{std.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2>우수 학생</h2>

                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>평균점수</th>
                            <th>출석률</th>
                            <th>상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {excellentStd.map((std, index) => (
                            <tr key={index}>
                                <td>{std.name}</td>
                                <td>{std.avg_score}</td>
                                <td>{std.attend_rate}</td>
                                <td>{std.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    );
}

export default StudentAnalysisPage;