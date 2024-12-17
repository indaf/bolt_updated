import React, { useEffect, useState } from "react";
import { Trophy, Medal, Clock, ChevronDown } from "lucide-react";
import { getTopGameScoresOfMonth } from "../../../services/GameScore/gameScore.service";
import { AxiosResponse } from "axios";
import { notifyError } from "../../../helpers/Notify.helper";
import { generateTimeFilter } from "../../../helpers/Date.helper";

export function Leaderboard() {
  const [selectedTime, setSelectedTime] = useState();
  const [bestsScores, setBestsScores] = useState<Array<any>>([]);
  const [timeFilters, setTimeFilters] = useState<Array<any>>(
    generateTimeFilter()
  );

  useEffect(() => {
    getTopGameScoresOfMonth(
      "adaptive",
      timeFilters.filter((filter) => filter.value === selectedTime)[0]
    )
      .then((response: AxiosResponse) => {
        setBestsScores(response.data);
      })
      .catch((error) => {
        console.log(error);
        notifyError("Erreur lors de la récupération des scores");
      });
  }, [selectedTime]);

  useEffect(() => {
    if (timeFilters.length > 0) {
      setSelectedTime(timeFilters[0].value);
    }
  }, [timeFilters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="relative inline-block">
          <select
            value={selectedTime}
            onChange={(e: any) => setSelectedTime(e.target.value)}
            className="appearance-none bg-[#202123] text-white px-4 py-2 pr-10 rounded-lg border border-[#343541] focus:outline-none focus:border-[#009B70] cursor-pointer"
          >
            {timeFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        {bestsScores.map((entry, index) => (
          <div key={entry.id} className="bg-[#202123] rounded-lg p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#343541] flex items-center justify-center flex-shrink-0">
                  {index === 0 ? (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  ) : index === 1 ? (
                    <Medal className="w-4 h-4 text-gray-400" />
                  ) : index === 2 ? (
                    <Medal className="w-4 h-4 text-amber-600" />
                  ) : (
                    <span className="text-sm text-gray-400">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {entry.user.first_name} {entry.user.last_name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Score</p>
                    <p className="text-lg font-medium text-[#009B70]">
                      {entry.score}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Temps</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#009B70]" />
                      <p className="text-lg font-medium text-[#009B70]">
                        {entry.data.duration}s
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400 bg-[#2A2B32] px-4 py-2 rounded-lg">
                Consigne : {entry.data.instruction}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
