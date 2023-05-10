import React, {useState, useEffect, useRouter} from 'react'
import rockset from '@rockset/client';

const AWSTpls = ({props}) => {
  //const client = rockset(process.env.ROCKSET_APIKEY, process.env.ROCKSET_APISERVER);

  //const [scores, setScores] = useState([]);

  /*useEffect(() => {
    const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'us-west-2' });
    const query = `{SELECT player_id, score, RANK() OVER (ORDER BY score DESC) AS rank FROM leaderboard WHERE game_id = ${gameId} LIMIT 10;}`
    client.queryLambdas.execute('leaderboard', query).then((result) => {
      setScores(result.results);
    });
    const stream = dynamoDb.createReadStream({
      TableName: 'leaderboard',
      KeyConditions: {
        game_id: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [gameId],
        },
      },
    });

    stream.on('data', (record) => {
      const newScore = record.NewImage;

      client.queryLambdas.execute('leaderboard', query).then((result) => {
        setScores(result.results);
      });
    });
  }, [gameId]);*/
  /*return (
    <div>
      <h2>Leaderboard for Game {gameId}</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.player_id}>
              <td>{score.rank}</td>
              <td>{score.player_id}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );*/
  return(
    <>
      <div className="my-4">
        <div id="tpls" className="mt-3 mb-2 w-full flex relative gap-x-6 webkitutil-center text-center items-start">
          {props.period.map((elem, i) => (
            <div key={i}>
              <button
                id="activeOnLoad"
                onClick={() => alert('coming soon')}
                type="button"
                key={props.id} 
                className={`hover:transition transition-all bg-slate-800 px-4 lg:px-6 hover:bg-indigo-500 hover:outline hover:outline-1 hover:outline-offset-2 hover:outline-sky-900 inline-flex webkitutil-center webkit-box-pack items-center align-middle rounded-md font-semibold justify-center relative border-0 h-14 min-w-[3rem] select-none`}>
                <h3 className="font-sans text-sm sm:text-base">
                  {elem.time}
                </h3>
              </button>
            </div>
          ))}
          
        </div>
        <div className="my-6 p-6">
          Text
        </div>
      </div>
      
    </>
    
  )

}

export default AWSTpls
