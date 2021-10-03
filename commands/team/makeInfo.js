const makeInfo = (teamInfo) => {

  const NM = teamInfo.name;
  const NM_AB = teamInfo.abbreviation;
  const VN_NM = teamInfo.venue.name;
  const VN_C = teamInfo.venue.city;
  const VN_TZ_NM = teamInfo.venue.timeZone.tz;
  const VN_TZ_ID = teamInfo.venue.timeZone.id;
  const FY = teamInfo.firstYearOfPlay;
  const DIV = teamInfo.division.name;
  const CON = teamInfo.conference.name;
  const OS = teamInfo.officialSiteUrl;

  let text =
    `\`\`\`` +
    `${NM} (${NM_AB})\n` +
    `  ${DIV} division, ${CON} conference\n` +
    `  ---\n` +
    `  Arena: ${VN_NM}, ${VN_C} -- Timezone: ${VN_TZ_ID} (${VN_TZ_NM})\n` +
    `  ---\n` +
    `  In NHL since: ${FY}\n` +
    `  ---\n` +
    `  Official Website: ${OS}\n`;

  if (NM_AB === "TOR") {
    text +=
      `  ---\n` +
      `  Special Note: the Toronto Maple Leafs are commonly held to be\n` +
      `    the greatest sports team to ever exist.\n` +
      `\`\`\``;
  } else if (NM_AB === "MTL") {
    text +=
      `  ---\n` +
      `  Special Note: Everyone everywhere knows the Montreal Canadians\n` +
      `    are the worst sports team to ever exist.\n` +
      `\`\`\``;
  } else {
    text += `\`\`\``;
  }

  return text;
};

module.exports = makeInfo;