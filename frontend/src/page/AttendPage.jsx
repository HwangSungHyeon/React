import { useEffect, useState } from "react";

function AttendPage({students}){
    const [studentId, setStudentId] = useState("");
    const [attend, setAttend] = useState("");
    const [late, setLate] = useState("");
    const [absent, setAbsent] = useState("");
    const [earlyLeave, setEarlyLeave] = useState("");

    // 출석 목록 state
    const [attends, setAttends] = useState([]);

    const API_URL = "http://localhost:8000";

    // 등록된 출석 목록 조회
    const getAttends = async () => {
        const response = await fetch(`${API_URL}/attend`);
        const data = await response.json();
        setAttends(data)
    }

    // 출석 저장하기
    const addAttend = async () => {
        if(studentId === ""){
            alert("학생을 선택하시오."); return;
        }
        
        const attendData = {
            student_id : Number(studentId),
            attend : Number(attend),
            late : Number(late),
            absent : Number(absent),
            early_leave : Number(earlyLeave)
        };
        const response = await fetch(`${API_URL}/attend`, {
            method: "POST",
            headers: { "Content-Type":"application/json"},
            body: JSON.stringify(attendData)
        });
        const result = await response.json();
        if(!response.ok){
            alert(result.message); return;
        }
        setStudentId(""); setAttend(""); setLate(""); setAbsent(""); setEarlyLeave("");
        
        getAttends("");
    };

    useEffect( () => {
        getAttends();
    }, []);

    return(
        <div>

            <h1>4. 출석 입력 / 조회</h1>
            <p>출석, 지각, 결석, 조퇴 횟수를 입력하고 출석률을 확인합니다.</p>

            <hr />

            <h2>출석 입력</h2>

            <div>

                <label>학생 선택</label>

                <select value={studentId}
                onChange={(e)=> setStudentId(e.target.value)}>
                    <option value="">학생을 선택하세요</option>
                    {students.map( (std) => (
                        <option key={std.id} value={std.id}>
                            {std.name}
                        </option>
                    ))}
                </select>

            </div>

            <br />

            <div>

                <label>출석 횟수</label>
                <input type="number" value={attend}
                onChange={(e)=>setAttend(e.target.value)}/>

                <label>지각 횟수</label>
                <input type="number" value={late}
                onChange={(e)=>setLate(e.target.value)} />

                <label>결석 횟수</label>
                <input type="number" value={absent}
                onChange={(e)=>setAbsent(e.target.value)} />

                <label>조퇴 횟수</label>
                <input type="number" value={earlyLeave}
                onChange={(e)=>setEarlyLeave(e.target.value)} />

            </div>

            <br />

            <div>

                <label>출석률</label>
                <input type="text" value="90.00%" readOnly />

            </div>

            <br />

            <button type="button" onClick={addAttend} className="border w-30 bg-green-700 text-white">저장</button>
            <button>초기화</button>

            <hr />

            <h2>출석 조회</h2>

            <table border="1">

                <thead>

                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>출석</th>
                        <th>지각</th>
                        <th>결석</th>
                        <th>조퇴</th>
                        <th>총 출결</th>
                        <th>출석률</th>
                        <th>등록일</th>
                    </tr>

                </thead>

                <tbody>
                    {attends.map( (attend) => (
                        <tr key={(attend.id)}>
                            <td className="text-center">{attend.student_id}</td>
                            <td className="text-center">{attend.student_name}</td>
                            <td className="text-center">{attend.attend}</td>
                            <td className="text-center">{attend.late}</td>
                            <td className="text-center">{attend.absent}</td>
                            <td className="text-center">{attend.early_leave}</td>
                            <td className="text-center">{attend.total_count}</td>
                            <td className="text-center">{attend.attendance_rate}%</td>
                            <td className="text-center">{attend.create_at}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    )
}

export default AttendPage;