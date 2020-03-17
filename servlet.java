package ca.calgary.www.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(
                             service = Servlet.class, 
                             immediate = true, 
                             configurationPolicy = ConfigurationPolicy.OPTIONAL, 
                             property = { "sling.servlet.paths=" + "/bin/coc/recaptchav3", }
                             )

@Designate(ocd = RecaptchaV3Config.class, factory = true)
public class RecaptchaResponseServlet extends SlingSafeMethodsServlet {

              private static final long serialVersionUID = 1L;
              private static final String UTF8 = "UTF-8";
              private static final String RESPONSETYPE = "text/html";
              private RecaptchaV3Config config;

              @Activate
              @Modified
              protected void activate(RecaptchaV3Config c) {
                             this.config = c;
              }

              @Override
              protected void doGet(final SlingHttpServletRequest req, final SlingHttpServletResponse resp)
                                           throws ServletException, IOException {

                             String action = req.getParameter("action");
                             
                             if (action == null || action.isEmpty()) {
                                           resp.getWriter().write("[]");
                                           resp.getWriter().close();
                                           return;
                             }

                             if (action.equalsIgnoreCase("get_site_id")) {
                                           resp.setContentType(RESPONSETYPE);
                                           String returnVal = "{ \"site-id\": \"" + config.site_id() + "\" }";

                                           resp.getWriter().write(returnVal);

                                           resp.getWriter().close();
                             }

                             if (action.equalsIgnoreCase("get_g_response")) {
                                           resp.setContentType(RESPONSETYPE);

                                           resp.getWriter().write(getGoogleResponse(req));

                                           resp.getWriter().close();
                             }
              }

              public String getGoogleResponse(SlingHttpServletRequest req) {
                             String returnVal = "[]";
                             String gRecaptchaResponse = req.getParameter("g_recaptcha_response");
                             String configUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + config.secret_key()
                                                          + "&response=" + gRecaptchaResponse;
                             try {

                                           if (gRecaptchaResponse != null) {
                                                          CloseableHttpClient client = null;
                                                          HttpClientBuilder httpClientBuilder = null;
                                                          httpClientBuilder = HttpClientBuilder.create();
                                                          client = httpClientBuilder.build();
                                                          HttpGet request = new HttpGet(configUrl);

                                                          HttpResponse response = client.execute(request);
                                                          if (response != null && response.getEntity() != null) {
                                                                        HttpEntity entity = response.getEntity();
                                                                        returnVal = EntityUtils.toString(entity, UTF8);
                                                          }
                                           }
                             } catch (Exception e) {
                                           return e.getMessage();
                             }
                             return returnVal;
              }
}
