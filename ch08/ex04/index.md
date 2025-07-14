# 以下の入れ子の関数とアロー関数のコード実行結果を予想してから実行し、結果を説明しなさい。
予想

false true

true false

結果

false true

true false


説明

メソッドは定義されたオブジェクトをthisとしてもつので、obj.omのthisはobj

メソッドは定義されたオブジェクトをthisとしてもつので、obj.omのnest.nmのthisはnest

アロー関数は定義された関数内のスコープのthisを継承するため、今回はobj.om内に作られていることから、thisがobjとなる。
