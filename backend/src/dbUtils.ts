/**
 * Returns a string for a db insert query for all glaze test/glazes pairs
 * @param glazeTestId: number
 * @param glazes: Array<number>
 * @returns string
 */
const formatGlazeTestRelationshipPairs = (
  glazeTestId: number,
  glazes: Array<number>
) => {
  let result: Array<string> = [];
  glazes.forEach((e, index) => {
    result.push(`(${glazeTestId}, ${e}, ${index + 1})`);
    console.log("element: ", e);
  });
  const finalResult = result.join(", ");
  console.log("final result: ", finalResult);
  return finalResult;
};

// output should be (7 , 1),

export default { formatGlazeTestRelationshipPairs };
// TODO: figure out how to export this and use it to insert glaze test relationship pairs
