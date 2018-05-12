---
id: api
title: Waffle Map Mesh CalculatorのAPIについて
---

## toMeshCode: (lat: number, lng: number, scale: number) => string

指定された緯度経度、スケールを元に対応するメッシュコードを返します。<br>
標準地域メッシュコードを例にとった場合、下記のような動きになります。

    const meshCode = toMeshCode(35, 139, 1)
    console.log(meshCode) // 5238
   
##  toBounds: (meshCode: string) => Bounds

指定されたメッシュコードから、バウンディングボックスを返します。

    const bounds = toBounds(5238)
    console.log(bounds) // { leftTop: { lat: 35.33334, lng: 138 }, rightBottom: { lat: 34.66667, lng: 139 }}

## toCenterLatLng: (meshCode: string) => LatLng

指定されたメッシュコードから、メッシュの中心緯度経度を返します。

    const latLng = toCenterLatLng(5238)
    console.log(latLng) // { lat: 35, lng: 138.5 }

## scaleFrom(zoom: number): number

指定されたズームレベルから対応するスケールを返します。

    const scale = scaleFrom(6)
    console.log(scale) // 1

## offset(meshCode: string, x: number, y: number): string

任意のメッシュコードを指定数文オフセットしたメッシュコードを返します。

    const meshCode = offset(5239, 1, -2)
    console.log(meshCode)// 5337