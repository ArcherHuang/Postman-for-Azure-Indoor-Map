const baseUrl = 'https://us.atlas.microsoft.com';
let mapPrimaryKey = '';
let datasetId = '';
let styleRules = '';
let statesetId = '';
let setBtn = '';

function setStyle() {
  mapPrimaryKey = document.getElementById("mapPrimaryKey").value;
  datasetId = document.getElementById("datasetId").value;
  styleRules = document.getElementById("styleRules").value;
  setBtn = document.getElementById("set-btn");
  setBtn.disabled = true;
  setBtn.innerText = "處理中";
  console.log(`mapPrimaryKey: ${mapPrimaryKey}, datasetId: ${datasetId}, styleRules: ${styleRules}`);
  prettyPrintJSON();
  if (mapPrimaryKey == '' ||
    datasetId == '' ||
    styleRules == ''
  ) {
    alert('請輸入 Map Primary Key、Dataset ID、Style Rules');
  } else {
    postFeatureStatesets();
  }
}

function postFeatureStatesets() {
  const postStylesURL = `${baseUrl}/featurestatesets?api-version=2.0&datasetId=${datasetId}&subscription-key=${mapPrimaryKey}`;
  console.log(`postFeatureStatesets_URL: ${postStylesURL}`);
  console.log(`styleRules: ${styleRules}`);
  try {
    axios.post(postStylesURL, JSON.parse(styleRules))
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          statesetId = response.data.statesetId;
          console.log(`statesetId: ${statesetId}`);
          toastr.success('Feature Statesets 設定成功 ~');
          setBtn.disabled = false;
          setBtn.innerText = "設定 Style";
        }
      })
      .catch(function (error) {
        console.log(error);
        toastr.error('Feature Statesets 設定失敗 ~');
        setBtn.disabled = false;
        setBtn.innerText = "設定 Style";
      });
  } catch (e) {
    toastr.error('Feature Statesets 設定失敗 ~');
    setBtn.disabled = false;
    setBtn.innerText = "設定 Style";
  }
}

function prettyPrintJSON() {
  document.getElementById('styleRules').value = JSON.stringify(JSON.parse(styleRules), undefined, 4);
}