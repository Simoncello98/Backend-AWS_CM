param($table, $accessKey, $secretKey, $region)

if ($table -eq $null -Or $accessKey -eq $null -Or $secretKey -eq $null -Or $secretKey -eq $null -Or $region -eq $null) {
    write-host "[Error]: .\exportDynamoDBTabples.ps1 -table <table> -accessKey <accesskey> -secretKey <secretKey> -region <region>"

} else {
    write-host "Download and Export csv file from $table ..."
    $fileName = $table + ".csv"
    npx dynamodb-to-csv -t $table > $fileName -i $accesskey -s $secretKey -r $region
}
