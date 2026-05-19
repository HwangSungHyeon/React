import { useEffect, useState } from "react";

function ScorePage(){
    const [studentId, setStudentId] = useState("");
    const [pythonScore, setPythonScore] = useState("");
    const [numpyScore, setNumpyScore] = useState("");
    const [pandasScore, setPandasScore] = useState("");
    const [javaScore, setJavaScore] = useState("");
    const [projectScore, setProjectScore] = useState("");

    // 성적 목록 state
    const [students, setStudents] = useState([]);
    const [scores, setScores] = useState([]);

    const API_URL = "http://localhost:8000";

    // 등록된 학생 전체 조회
    const getStudents = async () => {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        setStudents(data);
    };

    // 등록된 성적 목록 조회
    const getScores = async () => {
        const response = await fetch(`${API_URL}/scores`);
        const data = await response.json();
        setScores(data);
    }

    // 성적 저장하기
    const addScore = async () => {
        if(studentId === ""){
            alert("학생을 선택하시오"); return;
        }

        const scoreData = {
            student_id : Number(studentId),
            python_score : Number(pythonScore),
            numpy_score : Number(numpyScore),
            pandas_score : Number(pandasScore),
            java_score : Number(javaScore),
            project_score : Number(projectScore)
        };
        const response = await fetch(`${API_URL}/scores`, {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(scoreData)
        });
        const result = await response.json();
        if( !response.ok ){ // 성적 저장 실패
            alert(result.message); return;
        }
        setStudentId(""); setPythonScore(""); setNumpyScore("");
        setPandasScore(""); setJavaScore(""); setProjectScore("");

        getScores();
    };

    useEffect( () => {
        getStudents();
        getScores();
    }, []);

    return(
        <div>

            <h1>3. 성적 입력 / 조회</h1>
            <p>과목별 점수를 입력하고 학생별 평균 점수를 확인합니다.</p>

            <hr />

            <h2>성적 입력</h2>

            <div>

                <label>학생 선택</label>
                <select value={studentId}
                onChange={(e)=> setStudentId(e.target.value)}>
                    <option value="">학생을 선택하세요</option>
                    { students.map( (std) => (
                        <option key={std.id} value={std.id}>
                            {std.name}
                        </option>
                    ))}  
                </select>

            </div>

            <br />

            <div>

                <label>Python</label>
                <input type="number" value={pythonScore}
                onChange={(e)=>setPythonScore(e.target.value)} />

                <label>NumPy</label>
                <input type="number" value={numpyScore}
                onChange={(e)=>setNumpyScore(e.target.value)} />

                <label>Pandas</label>
                <input type="number" value={pandasScore}
                onChange={(e)=>setPandasScore(e.target.value)} />

                <label>Java</label>
                <input type="number" value={javaScore}
                onChange={(e)=>setJavaScore(e.target.value)} />

                <label>Project</label>
                <input type="number" value={projectScore}
                onChange={(e)=>setProjectScore(e.target.value)} />

            </div>

            <br />

            <div>

                <label>평균 점수</label>
                <input type="text" value="90.00" readOnly />

            </div>

            <br />

            <button type="button" onClick={addScore} className="border w-30 bg-green-700 text-white">저장</button>
            <button>초기화</button>

            <hr />

            <h2>성적 조회</h2>

            <div>

                <input type="text" placeholder="학생 이름 검색" />

                <select>
                    <option>전체 반</option>
                    <option>1반</option>
                    <option>2반</option>
                </select>

                <button>검색</button>

            </div>

            <br />

            <table border="1">

                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>Python</th>
                        <th>Numpy</th>
                        <th>Pandas</th>
                        <th>Java</th>
                        <th>Project</th>
                        <th>총점</th>
                        <th>평균점수</th>
                        <th>등록일</th>
                        <th>수정</th>
                    </tr>
                </thead>

                <tbody>
                    {scores.map( (score) => (
                        <tr key={score.id}>
                            <td className="text-center">{score.student_id}</td>
                            <td className="text-center">{score.student_name}</td>
                            <td className="text-center">{score.python_score}</td>
                            <td className="text-center">{score.numpy_score}</td>
                            <td className="text-center">{score.pandas_score}</td>
                            <td className="text-center">{score.java_score}</td>
                            <td className="text-center">{score.project_score}</td>
                            <td className="text-center">{score.total_score}</td>
                            <td className="text-center">{score.avg_score}</td>
                            <td className="text-center">{score.create_at}</td>
                            <td>
                                <button type="button">수정</button>
                            </td>
                        </tr>
                    ))}   
                    <tr>
                        <td>2</td>
                        <td>이영희</td>
                        <td>1반</td>
                        <td>B팀</td>
                        <td>80</td>
                        <td>82</td>
                        <td>78</td>
                        <td>85</td>
                        <td>90</td>
                        <td>83.00</td>
                    </tr>
                    
                    

                </tbody>

            </table>

        </div>
    )
}

export default ScorePage;