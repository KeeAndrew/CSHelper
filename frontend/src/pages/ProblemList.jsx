import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ProblemList() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const level = searchParams.get("level") || "";

    useEffect(() => {
        setLoading(true);
        fetch(`/api/problems${level ? `?level=${level}` : ""}`, { cache: "no-store" })
            .then(r => r.json())
            .then(setProblems)
            .finally(() => setLoading(false));
    }, [level]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Practice Problems</h2>
            <div className="flex gap-2 mb-6">
                {["", "easy", "medium", "hard"].map(lvl => (
                    <button
                        key={lvl}
                        onClick={() => setSearchParams(lvl ? { level: lvl } : {})}
                        className={`btn btn-sm ${level === lvl ? "btn-primary" : "btn-ghost"}`}
                    >
                        {lvl ? lvl[0].toUpperCase() + lvl.slice(1) : "All"}
                    </button>
                ))}
            </div>

            {loading ? <p>Loading…</p> :
                problems.length === 0 ? <p>No problems found.</p> :
                    <ul className="space-y-4">
                        {problems.map(p => (
                            <li key={p._id} className="card p-4 shadow">
                                <Link to={`/problems/${p._id}`} className="text-lg font-semibold">
                                    {p.title}
                                </Link>
                                <p className="text-sm opacity-70">{p.level.toUpperCase()}</p>
                            </li>
                        ))}
                    </ul>}
        </div>
    );
}
