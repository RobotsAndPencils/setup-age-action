# setup-age-action

Install [aɡe̞](https://github.com/FiloSottile/age) in your github action
to support encrypting files

## Example

```yaml
      - uses: RobotsAndPencils/setup-age-action@v1.0.0

      - name: Package Logs
        id: package_logs
        if: always()
        run: |
          age --recipients <recipients> --output logs.tar.gz.age logs.tar.gz
```
