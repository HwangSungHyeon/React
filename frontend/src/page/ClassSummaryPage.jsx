import { useState } from "react";

function ClassSummaryPage(){
    const [summary, setSummary] = useState(null);

    const requestAnalysis = async () => {
        const response = await fetch("http://localhost:8000/analysis/class-summary");
        const data = await response.json();
        if (!response.ok){  // 요청에 오류가 있다면
            alert(data);
            return;
        }
        setSummary(data);
    }

    return(

        <div>

            <h1>반 전체 통계</h1>

            <p>
                전체 학생 수, 반 평균 점수,
                평균 출석률, 과목별 최고점/최저점을 확인합니다.
            </p>
            <section className="flex justify-around">
                <h2>반 선택</h2>
    
                <div>
                    <select>
                        <option>전체 반</option>
                        <option>1반</option>
                        <option>2반</option>
                        <option>AIOT반</option>
                    </select>
                </div>
                    <button type="button" onClick={requestAnalysis}>분석 실행</button>
            </section>

            <hr />

            <h2>기본 통계</h2>
            <div className="flex justify-around">
                <div>
                    <h3>전체 학생 수</h3>
                    <p>{summary? summary.total_student:0} 명</p>
                </div>

                <div>
                    <h3>반 평균 점수</h3>
                    <p>{summary? summary.avg_score:0} 점</p>
                </div>

                <div>
                    <h3>평균 출석률</h3>
                    <p>{summary? summary.avg_attend_rate:0}%</p>
                </div>
            </div>

            <hr />

            <h2>과목별 최고점 / 최저점</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>과목</th>
                        <th>최고점</th>
                        <th>최저점</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Python</td>
                        <td className="pl-4">{summary? summary.python_max:0}</td>
                        <td>{summary? summary.python_min:0}</td>
                    </tr>

                    <tr>
                        <td>NumPy</td>
                        <td className="pl-4">{summary? summary.numpy_max:0}</td>
                        <td>{summary? summary.numpy_min:0}</td>
                    </tr>

                    <tr>
                        <td>Pandas</td>
                        <td className="pl-4">{summary? summary.pandas_max:0}</td>
                        <td>{summary? summary.pandas_min:0}</td>
                    </tr>

                    <tr>
                        <td>Java</td>
                        <td className="pl-4">{summary? summary.java_max:0}</td>
                        <td>{summary? summary.java_min:0}</td>
                    </tr>

                    <tr>
                        <td>Project</td>
                        <td className="pl-4">{summary? summary.project_max:0}</td>
                        <td>{summary? summary.project_min:0}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    )

}

export default ClassSummaryPage;